import { useNavigate } from 'react-router-dom'

import { routes } from '@/common/router'
import { SingIn } from '@/components/forms/signIn'
import { FormPageTemplate } from '@/pages/formPages/formPageTemplate'
import { useSignInMutation } from '@/services/authApi/authApi'
import { SignInArgs } from '@/services/authApi/authApiTypes'

export const SignInPage = () => {
  const [signIn] = useSignInMutation()

  const navigate = useNavigate()
  const onSubmit = async (data: SignInArgs) => {
    try {
      await signIn(data).unwrap()
      navigate(routes.main)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <FormPageTemplate>
      <SingIn onFormSubmit={onSubmit} />
    </FormPageTemplate>
  )
}
