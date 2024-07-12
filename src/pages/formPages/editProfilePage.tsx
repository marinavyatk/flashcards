import { useNavigate } from 'react-router-dom'

import { useShowErrors } from '@/common/customHooks/useShowErrors'
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
  const [updateUserData, { error: updateUserDataError, isLoading: showTopLoader }] =
    useUpdateUserDataMutation()
  const [signOut, { error: signOutError }] = useSignOutMutation()
  const { data } = useGetCurrentUserDataQuery()
  const navigate = useNavigate()

  const errors = [updateUserDataError, signOutError]

  useShowErrors(errors)
  const handleSignOut = async () => {
    try {
      await signOut().unwrap()
      localStorage.clear()
      navigate(routes.public.signIn)
    } catch (error: any) {
      console.log(error)
    }
  }
  const onSubmit = (data: UpdateUserData) => {
    updateUserData(data)
  }

  if (!data) {
    return
  }

  return (
    <PageTemplate showTopLoader={showTopLoader}>
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
