import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useShowErrors } from '@/common/customHooks/useShowErrors'
import { CreateNewPasswordFormValues } from '@/common/formValidation'
import { routes } from '@/common/router'
import { CreateNewPassword } from '@/components/forms/createNewPassword/createNewPassword'
import { PageTemplate } from '@/components/layouts/pageTemplate/pageTemplate'
import { useResetPasswordMutation } from '@/services/auth/authApi'

export const CreateNewPasswordPage = () => {
  const [createNewPassword, { error: resetPasswordError, isLoading: showTopLoader }] =
    useResetPasswordMutation()

  const errors = [resetPasswordError]

  useShowErrors(errors)

  const navigate = useNavigate()
  const onSubmit = async (data: CreateNewPasswordFormValues) => {
    const token = localStorage.getItem('accessToken') as string
    const requestData = { ...data, token }

    await createNewPassword(requestData)
      .unwrap()
      .then(() => {
        toast.success('Password successfully changed')
        navigate(routes.public.signIn)
      })
  }

  return (
    <PageTemplate showTopLoader={showTopLoader}>
      <CreateNewPassword onFormSubmit={onSubmit} />
    </PageTemplate>
  )
}
