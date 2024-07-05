import { useNavigate } from 'react-router-dom'

import { routes } from '@/common/router'
import { ForgotPassword } from '@/components/forms/forgotPassword'
import { PageTemplate } from '@/components/layouts/pageTemplate/pageTemplate'
import { useSendPasswordRecoveryEmailMutation } from '@/services/auth/authApi'
import { SendPasswordRecoveryEmailArgs } from '@/services/auth/authApiTypes'

export const ForgotPasswordPage = () => {
  const [sendPasswordRecoveryEmail] = useSendPasswordRecoveryEmailMutation()

  const navigate = useNavigate()
  const onSubmit = async (data: SendPasswordRecoveryEmailArgs) => {
    try {
      await sendPasswordRecoveryEmail(data).unwrap()
      navigate(routes.checkEmail)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <PageTemplate>
      <ForgotPassword onFormSubmit={onSubmit} />
    </PageTemplate>
  )
}
