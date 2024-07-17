import { useNavigate, useOutletContext } from 'react-router-dom'

import { useShowErrors } from '@/common/customHooks/useShowErrors'
import { routes } from '@/common/router'
import { EditProfile } from '@/components/forms/editProfile'
import { PageTemplate } from '@/components/layouts/pageTemplate/pageTemplate'
import { useSignOutMutation, useUpdateUserDataMutation } from '@/services/auth/authApi'
import { UpdateUserData, UserData } from '@/services/auth/authApiTypes'

export const EditProfilePage = () => {
  const [updateUserData, { error: updateUserDataError, isLoading: showTopLoader }] =
    useUpdateUserDataMutation()
  const [signOut, { error: signOutError }] = useSignOutMutation()
  const userData: UserData = useOutletContext()
  const navigate = useNavigate()

  const errors = [updateUserDataError, signOutError]

  useShowErrors(errors)
  const handleSignOut = async () => {
    await signOut()
      .unwrap()
      .then(() => navigate(routes.public.signIn))
  }
  const onSubmit = (data: UpdateUserData) => {
    updateUserData(data)
  }

  if (!userData) {
    return
  }

  return (
    <PageTemplate showTopLoader={showTopLoader}>
      <EditProfile
        email={userData?.email}
        name={userData?.name}
        onFormSubmit={onSubmit}
        onSignOut={handleSignOut}
        profilePhoto={userData?.avatar}
      />
    </PageTemplate>
  )
}
