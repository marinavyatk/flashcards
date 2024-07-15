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
} from '@/services/auth/authApiTypes'
import { flashcardsApi } from '@/services/flashcards-api'
import { PatchCollection } from '@reduxjs/toolkit/dist/query/core/buildThunks'

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
        keepUnusedDataFor: 0,
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
        query: args => ({
          body: args,
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
        invalidatesTags: ['UserData'],
        async onQueryStarted(_, { dispatch }) {
          dispatch(flashcardsApi.util.resetApiState())
          localStorage.clear()
        },
        query: () => ({
          method: 'POST',
          url: '/v2/auth/logout',
        }),
      }),
      updateUserData: builder.mutation<UserData, UpdateUserData>({
        invalidatesTags: ['UserData'],
        async onQueryStarted({ avatar, name }, { dispatch, getState, queryFulfilled }) {
          const patchResult: PatchCollection = []
          const invalidateBy = AuthApi.util.selectInvalidatedBy(getState(), [{ type: 'UserData' }])
          const formData = new FormData()

          const avatarObjectURL = avatar ? URL.createObjectURL(avatar as Blob) : ''

          formData.append('avatar', avatar ?? '')
          invalidateBy.forEach(({ originalArgs }) => {
            patchResult.push(
              dispatch(
                AuthApi.util.updateQueryData('getCurrentUserData', originalArgs, draft => {
                  if (name) {
                    draft.name = name
                  }
                  if (avatar) {
                    draft.avatar = avatarObjectURL
                  }
                })
              )
            )
          })
          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          } finally {
            if (avatarObjectURL) {
              URL.revokeObjectURL(avatarObjectURL)
            }
          }
        },
        query: args => {
          const { avatar, name } = args
          const formData = new FormData()

          name && formData.append('name', name)
          avatar && formData.append('avatar', avatar)

          return {
            body: formData,
            method: 'PATCH',
            url: '/v1/auth/me',
          }
        },
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
