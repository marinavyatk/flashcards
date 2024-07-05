import { useNavigate } from 'react-router-dom'

import { routes } from '@/common/router'
import { EditProfile } from '@/components/forms/editProfile'
import { PageTemplate } from '@/components/layouts/pageTemplate/pageTemplate'
import {
  useGetCurrentUserDataQuery,
  useSignOutMutation,
  useUpdateUserDataMutation,
} from '@/services/auth/authApi'
import { UpdateUserData } from '@/services/auth/authApiTypes'

export const EditProfilePage = () => {
  const [updateUserData, { error }] = useUpdateUserDataMutation()
  const [signOut] = useSignOutMutation()
  const { data } = useGetCurrentUserDataQuery()
  const navigate = useNavigate()

  console.log('request error', error)

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
