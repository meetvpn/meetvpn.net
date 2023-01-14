import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import createServer from "src/servers/mutations/createServer"
import { ServerForm, FORM_ERROR } from "src/servers/components/ServerForm"

const NewServerPage = () => {
  const router = useRouter()
  const [createServerMutation] = useMutation(createServer)

  return (
    <Layout title={"Create New Server"}>
      <h1>Create New Server</h1>

      <ServerForm
        submitText="Create Server"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateServer}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const server = await createServerMutation(values)
            // await router.push(Routes.ShowServerPage({ serverId: server.id }));
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ServersPage()}>
          <a>Servers</a>
        </Link>
      </p>
    </Layout>
  )
}

NewServerPage.authenticate = true

export default NewServerPage
