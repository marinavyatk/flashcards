import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ConfirmEmail } from '@/components/forms/confirmEmail'
import { PageTemplate } from '@/components/layouts/pageTemplate/pageTemplate'
import { useVerifyUserEmailMutation } from '@/services/auth/authApi'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

type ServerErrorData = {
  errorMessages: string[]
}

export const ConfirmEmailPage = () => {
  const [verifyEmail, { error, isError, isLoading, isSuccess }] = useVerifyUserEmailMutation()
  const { token } = useParams()

  const errorMessage =
    isError &&
    (error as FetchBaseQueryError)?.data &&
    ((error as FetchBaseQueryError).data as ServerErrorData)?.errorMessages?.join('. ')

  useEffect(() => {
    if (token) {
      verifyEmail({ code: token })
    }
  }, [token, verifyEmail])

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage as string)
    }
  }, [isError])

  return <PageTemplate isLoading={isLoading}>{isSuccess && <ConfirmEmail />}</PageTemplate>
}
