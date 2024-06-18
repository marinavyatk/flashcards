import { useNavigate } from 'react-router-dom'

import { routes } from '@/common/router'
import { CreateNewPassword } from '@/components/forms/createNewPassword/createNewPassword'
import { CreateNewPasswordFormValues } from '@/components/forms/formValidation'
import { FormPageTemplate } from '@/pages/formPages/formPageTemplate'
import { useResetPasswordMutation } from '@/services/authApi/authApi'

export const CreateNewPasswordPage = () => {
  const [createNewPassword] = useResetPasswordMutation()

  const navigate = useNavigate()
  const onSubmit = async (data: CreateNewPasswordFormValues) => {
    const token = localStorage.getItem('accessToken') as string
    const requestData = { ...data, token }

    try {
      await createNewPassword(requestData).unwrap()
      navigate(routes.signIn)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <FormPageTemplate>
      <CreateNewPassword onFormSubmit={onSubmit} />
    </FormPageTemplate>
  )
}
