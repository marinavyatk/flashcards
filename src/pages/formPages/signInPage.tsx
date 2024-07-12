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
    navigate(routes.private.main)
    if (!singInError) {
      toast.success('Welcome! Have fun learning!')
    }
  }

  return (
    <PageTemplate showTopLoader={showTopLoader}>
      <SingIn onFormSubmit={onSubmit} />
    </PageTemplate>
  )
}
