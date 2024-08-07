import { z } from 'zod'

export const fileSchema = z.custom<File>().optional()

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

export const addNewDeckSchema = z.object({
  cover: fileSchema,
  isPrivate: z.boolean().optional(),
  name: z.string().min(3).max(30),
})

export type addNewDeckFromValues = z.infer<typeof addNewDeckSchema>

export const addNewCardSchema = z.object({
  answer: z.string().min(3).max(500),
  answerImg: fileSchema,
  question: z.string().min(3).max(500),
  questionImg: fileSchema,
})

export type addNewCardFormValues = z.infer<typeof addNewCardSchema>

export const saveGradeSchema = z.object({
  grade: z.string().max(1).min(1),
})

export type saveGradeFormValues = z.infer<typeof saveGradeSchema>

export const updateDeckSchema = z.object({
  cover: fileSchema.or(z.string().url()),
  isPrivate: z.boolean().optional(),
  name: z.string().min(3).max(30).optional(),
})

export type updateDeckFormValues = z.infer<typeof updateDeckSchema>

export const updateCardSchema = z.object({
  answer: z.string().min(3).max(500).optional(),
  answerImg: fileSchema.or(z.string().url()),
  question: z.string().min(3).max(500).optional(),
  questionImg: fileSchema.or(z.string().url()),
})

export type updateCardFormValues = z.infer<typeof updateCardSchema>
