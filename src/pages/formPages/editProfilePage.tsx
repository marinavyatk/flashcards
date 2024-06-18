import { useNavigate } from 'react-router-dom'

import { routes } from '@/common/router'
import { EditProfile } from '@/components/forms/editProfile'
import { PageTemplate } from '@/pages/PageTemplate/pageTemplate'
import {
  useGetCurrentUserDataQuery,
  useSignOutMutation,
  useUpdateUserDataMutation,
} from '@/services/authApi/authApi'
import { UpdateUserData } from '@/services/authApi/authApiTypes'

export const EditProfilePage = () => {
  const [updateUserData] = useUpdateUserDataMutation()
  const [signOut] = useSignOutMutation()
  const { data } = useGetCurrentUserDataQuery()
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
    } catch (error: any) {
      console.log(error)
    }
  }

  if (!data) {
    return
  }

  return (
    <PageTemplate>
      <EditProfile
        email={data?.email}
        name={data?.name}
        onFormSubmit={onSubmit}
        onSignOut={handleSignOut}
        profilePhoto={data?.avatar}
      />
    </PageTemplate>
  )
}
