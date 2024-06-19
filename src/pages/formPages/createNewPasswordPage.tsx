import { useNavigate } from 'react-router-dom'

import { routes } from '@/common/router'
import { CreateNewPassword } from '@/components/forms/createNewPassword/createNewPassword'
import { CreateNewPasswordFormValues } from '@/components/forms/formValidation'
import { PageTemplate } from '@/pages/PageTemplate/pageTemplate'
import { useResetPasswordMutation } from '@/services/auth/authApi'

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
    <PageTemplate>
      <CreateNewPassword onFormSubmit={onSubmit} />
    </PageTemplate>
  )
}
