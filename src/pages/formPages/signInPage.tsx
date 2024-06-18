import { useNavigate } from 'react-router-dom'

import { routes } from '@/common/router'
import { SingIn } from '@/components/forms/signIn'
import { PageTemplate } from '@/pages/PageTemplate/pageTemplate'
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
    <PageTemplate>
      <SingIn onFormSubmit={onSubmit} />
    </PageTemplate>
  )
}
