import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useShowErrors } from '@/common/customHooks/useShowErrors'
import { routes } from '@/common/router'
import { SingIn } from '@/components/forms/signIn'
import { PageTemplate } from '@/components/layouts/pageTemplate/pageTemplate'
import { useSignInMutation } from '@/services/auth/authApi'
import { SignInArgs } from '@/services/auth/authApiTypes'

export const SignInPage = () => {
  const [signIn, { error: singInError, isLoading: showTopLoader }] = useSignInMutation()
  const errors = [singInError]

  useShowErrors(errors)
  const navigate = useNavigate()
  const onSubmit = async (data: SignInArgs) => {
    await signIn(data)
      .unwrap()
      .then(() => {
        toast.success('Welcome! Have fun learning!')
        navigate(routes.private.main)
      })
  }

  return (
    <PageTemplate showTopLoader={showTopLoader}>
      <SingIn onFormSubmit={onSubmit} />
    </PageTemplate>
  )
}
