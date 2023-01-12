import { CronJob } from "quirrel/blitz"
import db, { AccessKey } from "db"
import WPAPI from "wpapi"
import { SHADOWSOCKS_URI } from "ShadowsocksConfig"
import { byCountry } from "country-code-lookup"

// Initialize the WordPress API client
const wp = new WPAPI({ endpoint: "https://getoutline.me/wp-json" })

async function syncDatabase(): Promise<void> {
  // Find the latest key in the database
  const latestKey = await findLatestKey()

  console.log("Latest key in database: ", latestKey)

  // Check if the database is already up to date
  if (latestKey && latestKey.createdAt >= (await getLatestKeyDate())) {
    return
  }

  // Retrieve all of the keys from the WordPress REST API
  const allPosts = await getAllPots()

  // Add the missing keys to the database
  await addMissingKeys(allPosts)

  // Update the existing keys in the database
  await updateExistingKeys(allPosts)

  console.log("Database is up to date!")
}

async function findLatestKey(): Promise<AccessKey | null> {
  // Find the latest post in the database
  const latestKey = await db.accessKey.findFirst({
    orderBy: { createdAt: "desc" },
  })

  return latestKey
}

async function getLatestKeyDate(): Promise<Date> {
  // Retrieve the latest post from the WordPress REST API
  const latestKey = await wp.posts().order("desc").orderby("date").perPage(1).get()
  return new Date(latestKey[0].date)
}

async function getAllPots(): Promise<WPAPI.Key[]> {
  // Initialize an empty array to store all of the posts
  let allPosts: WPAPI.Post[] = []

  // Initialize the page number
  let page = 1

  // Initialize the hasMorePosts flag
  let hasMorePosts = true

  // Retrieve all of the posts from the WordPress REST API
  while (hasMorePosts) {
    try {
      const keys = await wp
        .posts()
        .param("lang", "en")
        .order("asc")
        .orderby("date")
        .perPage(100)
        .page(page)
        .embed()
        .get()
      console.log("Retrieved", keys.length, "posts")
      allPosts = allPosts.concat(keys)
      if (keys.length < 100) {
        hasMorePosts = false
      }
      page++
    } catch (error) {
      console.error(error)
    }
  }

  return allPosts
}

async function addMissingKeys(allPosts: WPAPI.Post[]): Promise<void> {
  // Create an array of functions to add missing keys to the database
  const addKeyFunctions = allPosts.map((post) => () => addKeyToDatabase(post))

  // Add all missing keys to the database concurrently
  await Promise.all(addKeyFunctions.map((fn) => fn()))
}

async function addKeyToDatabase(post: WPAPI.Post): Promise<void> {
  // Check if the key already exists in the database
  const existingKey = await findKeyInDatabase(post.id)
  if (!existingKey) {
    try {
      // Add the key to the database if it doesn't already exist
      const config = SHADOWSOCKS_URI.parse(post.acf.key_ss)
      const hostingId =
        (post._embedded["acf:term"] &&
          post._embedded["acf:term"][0] &&
          post._embedded["acf:term"][0]["id"]) ||
        1
      const hostingName =
        (post._embedded["acf:term"] &&
          post._embedded["acf:term"][0] &&
          post._embedded["acf:term"][0]["name"]) ||
        "Unknown"

      const locationId =
        (post._embedded["acf:term"] &&
          post._embedded["acf:term"][1] &&
          post._embedded["acf:term"][1]["id"]) ||
        1
      const locationName =
        (post._embedded["acf:term"] &&
          post._embedded["acf:term"][1] &&
          post._embedded["acf:term"][1]["name"]) ||
        "Unknown"

      // get look up country code
      const countryCode = await byCountry(locationName)?.iso2

      // console.log("countryCode", countryCode)

      // create on db the key to the database with location and hosting

      await db.accessKey.create({
        data: {
          keyId: post.id,
          host: config.host.data,
          method: config.method.data,
          password: config.password.data,
          port: config.port.data,
          access_url: post.acf.key_ss,
          server: {
            connectOrCreate: {
              where: { hostname: config.host.data },
              create: {
                hostname: config.host.data,
                quality: post.acf.key_quality,
                hosting: {
                  connectOrCreate: {
                    where: { id: hostingId },
                    create: {
                      id: hostingId,
                      provider: hostingName,
                    },
                  },
                },
                location: {
                  connectOrCreate: {
                    where: { id: locationId },
                    create: {
                      id: locationId,
                      country: locationName,
                      countryCode: countryCode,
                    },
                  },
                },
              },
            },
          },
        },
      })
      console.log("Added key", post.id)
    } catch (error) {
      console.error(error)
    }
  }
}

async function findKeyInDatabase(postId: number): Promise<AccessKey | null> {
  // Find the key with the matching ID in the database
  const existingKey = await db.accessKey.findUnique({
    where: {
      keyId: postId,
    },
  })
  return existingKey
}

async function updateExistingKeys(allKeys: WPAPI.Key[]): Promise<void> {
  // Create an array of functions to update existing keys in the database
  const updateKeyFunctions = allKeys.map((post) => () => updateKeyInDatabase(post))

  // Update all existing keys in the database concurrently
  await Promise.all(updateKeyFunctions.map((fn) => fn()))
}

async function updateKeyInDatabase(post: WPAPI.Key): Promise<void> {
  // Check if the post already exists in the database
  const existingKey = await findKeyInDatabase(post.id)
  if (existingKey) {
    try {
      // Update the existing post in the database if it already exists
      const config = SHADOWSOCKS_URI.parse(post.acf.key_ss)
      const hostingId =
        (post._embedded["acf:term"] &&
          post._embedded["acf:term"][0] &&
          post._embedded["acf:term"][0]["id"]) ||
        1
      const hostingName =
        (post._embedded["acf:term"] &&
          post._embedded["acf:term"][0] &&
          post._embedded["acf:term"][0]["name"]) ||
        "Unknown"

      const locationId =
        (post._embedded["acf:term"] &&
          post._embedded["acf:term"][1] &&
          post._embedded["acf:term"][1]["id"]) ||
        1
      const locationName =
        (post._embedded["acf:term"] &&
          post._embedded["acf:term"][1] &&
          post._embedded["acf:term"][1]["name"]) ||
        "Unknown"
      // get look up country code
      const countryCode = await byCountry(locationName)?.iso2

      // console.log("countryCode", countryCode)

      await db.accessKey.update({
        where: { keyId: post.id },
        data: {
          keyId: post.id,
          host: config.host.data,
          method: config.method.data,
          password: config.password.data,
          port: config.port.data,
          access_url: post.acf.key_ss,
          server: {
            connectOrCreate: {
              where: { hostname: config.host.data },
              create: {
                hostname: config.host.data,
                quality: post.acf.key_quality,
                hosting: {
                  connectOrCreate: {
                    where: { id: hostingId },
                    create: {
                      id: hostingId,
                      provider: hostingName,
                    },
                  },
                },
                location: {
                  connectOrCreate: {
                    where: { id: locationId },
                    create: {
                      id: locationId,
                      country: locationName,
                      countryCode: countryCode,
                    },
                  },
                },
              },
            },
          },
        },
      })
      console.log("Updated key", post.id)
    } catch (error) {
      console.error(error)
    }
  } else {
    try {
      // Delete the post from the database if it has been deleted in the WordPress REST API
      await db.accessKey.delete({
        where: { keyId: post.id },
      })
      console.log("Deleted key", post.id)
    } catch (error) {
      console.error(error)
    }
  }
}

export default CronJob(
  "api/queues/hourlyCron", // the path of this API route
  "@hourly", // cron schedule (see https://crontab.guru)
  async () => {
    console.log("The hour is upon us!")
    await syncDatabase()
    console.log("The hour is over!")
  }
)
