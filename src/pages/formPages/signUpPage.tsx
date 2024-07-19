import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useShowErrors } from '@/common/customHooks/useShowErrors'
import { confirmEmail } from '@/common/emails'
import { SignUpFormValues } from '@/common/formValidation'
import { routes } from '@/common/router'
import { SingUp } from '@/components/forms/signUp'
import { PageTemplate } from '@/components/layouts/pageTemplate/pageTemplate'
import { useCreateNewAccountMutation } from '@/services/auth/authApi'
import { CreateNewAccountArgs } from '@/services/auth/authApiTypes'

export const SignUpPage = () => {
  const [signUp, { error: signUpError, isLoading: showTopLoader }] = useCreateNewAccountMutation()
  const errors = [signUpError]

  useShowErrors(errors)
  const navigate = useNavigate()
  const onSubmit = async (data: SignUpFormValues) => {
    const requestData: CreateNewAccountArgs = {
      email: data.email,
      html: confirmEmail,
      password: data.password,
      sendConfirmationEmail: true,
      subject: 'Welcome on FlashCards',
    }

    await signUp(requestData)
      .unwrap()
      .then(() => {
        toast.success('You have successfully registered')
        navigate(routes.private.main)
      })
  }

  return (
    <PageTemplate showTopLoader={showTopLoader}>
      <SingUp onFormSubmit={onSubmit} />
    </PageTemplate>
  )
}
