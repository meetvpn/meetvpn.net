import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getServer from "src/servers/queries/getServer"
import updateServer from "src/servers/mutations/updateServer"
import { ServerForm, FORM_ERROR } from "src/servers/components/ServerForm"

export const EditServer = () => {
  const router = useRouter()
  const serverId = useParam("serverId", "number")
  const [server, { setQueryData }] = useQuery(
    getServer,
    { id: serverId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateServerMutation] = useMutation(updateServer)

  return (
    <>
      <Head>
        <title>Edit Server {server.id}</title>
      </Head>

      <div>
        <h1>Edit Server {server.id}</h1>
        <pre>{JSON.stringify(server, null, 2)}</pre>

        <ServerForm
          submitText="Update Server"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateServer}
          initialValues={server}
          onSubmit={async (values) => {
            try {
              const updated = await updateServerMutation({
                id: server.id,
                ...values,
              })
              // await setQueryData(updated);
              // await router.push(Routes.ShowServerPage({ serverId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditServerPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditServer />
      </Suspense>

      <p>
        {/* <Link href={Routes.ServersPage()}>
          <a>Servers</a>
        </Link> */}
      </p>
    </div>
  )
}

EditServerPage.authenticate = true
EditServerPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditServerPage
