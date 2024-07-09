import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { routes } from '@/common/router'
import { SingIn } from '@/components/forms/signIn'
import { PageTemplate } from '@/components/layouts/pageTemplate/pageTemplate'
import { useSignInMutation } from '@/services/auth/authApi'
import { SignInArgs } from '@/services/auth/authApiTypes'

export const SignInPage = () => {
  const [signIn] = useSignInMutation()
  const [notification, setNotification] = useState('')

  const navigate = useNavigate()
  const onSubmit = async (data: SignInArgs) => {
    setNotification('')

    try {
      await signIn(data).unwrap()
      console.log('navigate')
      navigate(routes.private.main)
    } catch (error: any) {
      console.log(error)
      setNotification(error.data.message)
    }
  }

  return (
    <PageTemplate notificationDescription={notification}>
      <SingIn onFormSubmit={onSubmit} />
    </PageTemplate>
  )
}
