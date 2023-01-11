import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetServersInput
  extends Pick<Prisma.ServerFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  // resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetServersInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: servers,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.server.count({ where }),
      query: (paginateArgs) => db.server.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      servers,
      nextPage,
      hasMore,
      count,
    }
  }
)
