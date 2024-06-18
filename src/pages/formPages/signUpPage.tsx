import { useNavigate } from 'react-router-dom'

import { routes } from '@/common/router'
import { SignUpFormValues } from '@/components/forms/formValidation'
import { SingUp } from '@/components/forms/signUp'
import { FormPageTemplate } from '@/pages/formPages/formPageTemplate'
import { useCreateNewAccountMutation } from '@/services/authApi/authApi'
import { CreateNewAccountArgs } from '@/services/authApi/authApiTypes'

export const SignUpPage = () => {
  const [signUp] = useCreateNewAccountMutation()

  const navigate = useNavigate()
  const onSubmit = async (data: SignUpFormValues) => {
    const requestData: CreateNewAccountArgs = { email: data.email, password: data.password }

    try {
      await signUp(requestData).unwrap()
      navigate(routes.main)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <FormPageTemplate>
      <SingUp onFormSubmit={onSubmit} />
    </FormPageTemplate>
  )
}
