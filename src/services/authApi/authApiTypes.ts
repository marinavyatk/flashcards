export type UserData = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}

export type UpdateUserData = {
  avatar?: string
  name?: string
}

export type SignInArgs = {
  email: string
  password: string
  rememberMe?: boolean
}

export type Tokens = {
  accessToken: string
  refreshToken: string
}

export type CreateNewAccountArgs = {
  email: string
  html?: string
  name?: string
  password: string
  sendConfirmationEmail?: boolean
  subject?: string
}

export type VerifyUserEmailArgs = {
  code: string
}

export type SendEmailAgainArgs = {
  html: string
  subject: string
  userId: string
}

export type SendPasswordRecoveryEmailArgs = {
  email: string
  html?: string
  subject?: string
}

export type ResetPasswordArgs = {
  password: string
  token: string
}
