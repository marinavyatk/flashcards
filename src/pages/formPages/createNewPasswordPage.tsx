import { useNavigate } from 'react-router-dom'

import { CreateNewPasswordFormValues } from '@/common/formValidation'
import { routes } from '@/common/router'
import { CreateNewPassword } from '@/components/forms/createNewPassword/createNewPassword'
import { PageTemplate } from '@/components/layouts/pageTemplate/pageTemplate'
import { useResetPasswordMutation } from '@/services/auth/authApi'

export const CreateNewPasswordPage = () => {
  const [createNewPassword, { isLoading: showTopLoader }] = useResetPasswordMutation()

  const navigate = useNavigate()
  const onSubmit = async (data: CreateNewPasswordFormValues) => {
    const token = localStorage.getItem('accessToken') as string
    const requestData = { ...data, token }

    try {
      await createNewPassword(requestData).unwrap()
      navigate(routes.public.signIn)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <PageTemplate showTopLoader={showTopLoader}>
      <CreateNewPassword onFormSubmit={onSubmit} />
    </PageTemplate>
  )
}
