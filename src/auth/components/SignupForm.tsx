import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import signup from "src/auth/mutations/signup"
import { useMutation } from "@blitzjs/rpc"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  return (
    <div>
      <h1>Generate Account</h1>

      <Form
        submitText="Generate Account"
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            return { [FORM_ERROR]: error.toString() }
          }
        }}
      />
    </div>
  )
}

export default SignupForm
