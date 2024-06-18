import { z } from 'zod'

export const createNewPasswordSchema = z.object({
  password: z.string().min(3).max(30),
})

export type CreateNewPasswordFormValues = z.infer<typeof createNewPasswordSchema>

export const editProfileSchema = z.object({
  name: z.string().min(3).max(30),
})

export type EditProfileFormValues = z.infer<typeof editProfileSchema>

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(30),
  rememberMe: z.boolean().optional(),
})

export type SignInFormValues = z.infer<typeof signInSchema>

export const signUpSchema = z
  .object({
    confirmPassword: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(3).max(30),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export type SignUpFormValues = z.infer<typeof signUpSchema>
