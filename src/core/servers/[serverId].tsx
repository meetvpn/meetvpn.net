import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getServer from "src/servers/queries/getServer"
import deleteServer from "src/servers/mutations/deleteServer"

export const Server = () => {
  const router = useRouter()
  const serverId = useParam("serverId", "number")
  const [deleteServerMutation] = useMutation(deleteServer)
  const [server] = useQuery(getServer, { id: serverId })

  return (
    <>
      <Head>
        <title>Server {server.id}</title>
      </Head>

      <div>
        <h1>Server {server.id}</h1>
        <pre>{JSON.stringify(server, null, 2)}</pre>

        {/* <Link href={Routes.EditServerPage({ serverId: server.id })}>
          <a>Edit</a>
        </Link> */}

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteServerMutation({ id: server.id })
              // await router.push(Routes.ServersPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowServerPage = () => {
  return (
    <div>
      <p>
        {/* <Link href={Routes.ServersPage()}>
          <a>Servers</a>
        </Link> */}
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Server />
      </Suspense>
    </div>
  )
}

ShowServerPage.authenticate = true
ShowServerPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowServerPage
