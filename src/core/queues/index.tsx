import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import enqueueGreeting from "src/queues/mutations/enqueueGreeting"
import { QueueForm, FORM_ERROR } from "src/queues/components/QueueForm"

const NewQueuePage = () => {
  const router = useRouter()
  const [createServerMutation] = useMutation(enqueueGreeting)

  return (
    <Layout title={"Create New Queue"}>
      <h1>Create New Server</h1>

      <QueueForm
        submitText="Create Queue"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateServer}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const queues = await createServerMutation(values)
            console.log("queues", queues)

            // await router.push(Routes.ShowServerPage({ serverId: server.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        {/* <Link href={Routes.ServersPage()}>
          <a>Servers</a>
        </Link> */}
      </p>
    </Layout>
  )
}

NewQueuePage.authenticate = true

export default NewQueuePage
