import { useNavigate } from 'react-router-dom'

import { routes } from '@/common/router'
import { ForgotPassword } from '@/components/forms/forgotPassword'
import { FormPageTemplate } from '@/pages/formPages/formPageTemplate'
import { useSendPasswordRecoveryEmailMutation } from '@/services/authApi/authApi'
import { SendPasswordRecoveryEmailArgs } from '@/services/authApi/authApiTypes'

export const ForgotPasswordPage = () => {
  const [sendPasswordRecoveryEmail] = useSendPasswordRecoveryEmailMutation()

  const navigate = useNavigate()
  const onSubmit = async (data: SendPasswordRecoveryEmailArgs) => {
    console.log('ForgotPasswordPageData', data)
    try {
      await sendPasswordRecoveryEmail(data).unwrap()
      navigate(routes.checkEmail)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <FormPageTemplate>
      <ForgotPassword onFormSubmit={onSubmit} />
    </FormPageTemplate>
  )
}
