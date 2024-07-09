import { useNavigate } from 'react-router-dom'

import { SignUpFormValues } from '@/common/formValidation'
import { routes } from '@/common/router'
import { SingUp } from '@/components/forms/signUp'
import { PageTemplate } from '@/components/layouts/pageTemplate/pageTemplate'
import { useCreateNewAccountMutation } from '@/services/auth/authApi'
import { CreateNewAccountArgs } from '@/services/auth/authApiTypes'

export const SignUpPage = () => {
  const [signUp] = useCreateNewAccountMutation()

  const navigate = useNavigate()
  const onSubmit = async (data: SignUpFormValues) => {
    const requestData: CreateNewAccountArgs = { email: data.email, password: data.password }

    try {
      await signUp(requestData).unwrap()
      navigate(routes.private.main)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <PageTemplate>
      <SingUp onFormSubmit={onSubmit} />
    </PageTemplate>
  )
}
