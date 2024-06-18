import { useNavigate } from 'react-router-dom'

import { routes } from '@/common/router'
import { EditProfile } from '@/components/forms/editNickname'
import { FormPageTemplate } from '@/pages/formPages/formPageTemplate'
import { useSignOutMutation, useUpdateUserDataMutation } from '@/services/authApi/authApi'
import { UpdateUserData } from '@/services/authApi/authApiTypes'

export const EditProfilePage = () => {
  const [updateUserData] = useUpdateUserDataMutation()
  const [signOut] = useSignOutMutation()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut().unwrap()
      localStorage.clear()
      navigate(routes.signIn)
    } catch (error: any) {
      console.log(error)
    }
  }
  const onSubmit = async (data: UpdateUserData) => {
    try {
      await updateUserData(data).unwrap()
      navigate(routes.main)
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <FormPageTemplate>
      <EditProfile onFormSubmit={onSubmit} />
    </FormPageTemplate>
  )
}
