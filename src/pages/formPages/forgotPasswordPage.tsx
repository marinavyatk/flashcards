import { useNavigate } from 'react-router-dom'

import { useShowErrors } from '@/common/customHooks/useShowErrors'
import { recoverPasswordEmail } from '@/common/emails'
import { routes } from '@/common/router'
import { ForgotPassword } from '@/components/forms/forgotPassword'
import { PageTemplate } from '@/components/layouts/pageTemplate/pageTemplate'
import { useSendPasswordRecoveryEmailMutation } from '@/services/auth/authApi'
import { SendPasswordRecoveryEmailArgs } from '@/services/auth/authApiTypes'

export const ForgotPasswordPage = () => {
  const [sendPasswordRecoveryEmail, { error: sendEmailError, isLoading: showTopLoader }] =
    useSendPasswordRecoveryEmailMutation()
  const errors = [sendEmailError]

  useShowErrors(errors)
  const navigate = useNavigate()
  const onSubmit = async (data: SendPasswordRecoveryEmailArgs) => {
    await sendPasswordRecoveryEmail({ ...data, html: recoverPasswordEmail })
      .unwrap()
      .then(() => navigate(routes.public.checkEmail))
  }

  return (
    <PageTemplate showTopLoader={showTopLoader}>
      <ForgotPassword onFormSubmit={onSubmit} />
    </PageTemplate>
  )
}
