import {
  CreateNewAccountArgs,
  ResetPasswordArgs,
  SendEmailAgainArgs,
  SendPasswordRecoveryEmailArgs,
  SignInArgs,
  Tokens,
  UpdateUserData,
  UserData,
  VerifyUserEmailArgs,
} from '@/services/authApi/authApiTypes'
import { flashcardsApi } from '@/services/flashcards-api'

export const AuthApi = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      createNewAccount: builder.mutation<UserData, CreateNewAccountArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v1/auth/sign-up',
        }),
      }),
      getCurrentUserData: builder.query<UserData, void>({
        providesTags: ['UserData'],
        query: () => ({
          method: 'GET',
          url: '/v1/auth/me',
        }),
      }),
      getNewAccessToken: builder.mutation<void, void>({
        query: () => ({
          method: 'POST',
          url: '/v2/auth/refresh-token',
        }),
      }),
      resetPassword: builder.mutation<void, ResetPasswordArgs>({
        query: ({ password, token }) => ({
          body: password,
          method: 'POST',
          url: `/v1/auth/reset-password/${token}`,
        }),
      }),
      sendEmailAgain: builder.mutation<void, SendEmailAgainArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: '',
        }),
      }),
      sendPasswordRecoveryEmail: builder.mutation<void, SendPasswordRecoveryEmailArgs>({
        query: () => ({
          method: 'POST',
          url: '/v1/auth/recover-password',
        }),
      }),
      signIn: builder.mutation<Tokens, SignInArgs>({
        async onQueryStarted(_, { queryFulfilled }) {
          const { data } = await queryFulfilled

          if (!data) {
            return
          }

          localStorage.setItem('accessToken', data.accessToken)
          localStorage.setItem('refreshToken', data.refreshToken)
        },
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v1/auth/login',
        }),
      }),
      signOut: builder.mutation<void, void>({
        query: () => ({
          method: 'POST',
          url: '/v2/auth/logout',
        }),
      }),
      updateUserData: builder.mutation<UpdateUserData, UserData>({
        invalidatesTags: ['UserData'],
        query: args => ({
          body: { ...args },
          method: 'PATCH',
          url: '/v1/auth/me',
        }),
      }),
      verifyUserEmail: builder.mutation<void, VerifyUserEmailArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v1/auth/verify-email',
        }),
      }),
    }
  },
})

export const {
  useCreateNewAccountMutation,
  useGetCurrentUserDataQuery,
  useGetNewAccessTokenMutation,
  useResetPasswordMutation,
  useSendEmailAgainMutation,
  useSendPasswordRecoveryEmailMutation,
  useSignInMutation,
  useSignOutMutation,
  useUpdateUserDataMutation,
  useVerifyUserEmailMutation,
} = AuthApi
