import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useShowErrors } from '@/common/customHooks/useShowErrors'
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
    const requestData: CreateNewAccountArgs = { email: data.email, password: data.password }

    await signUp(requestData).unwrap()
    navigate(routes.private.main)
    if (!signUpError) {
      toast.success('You have successfully registered')
    }
  }

  return (
    <PageTemplate showTopLoader={showTopLoader}>
      <SingUp onFormSubmit={onSubmit} />
    </PageTemplate>
  )
}
