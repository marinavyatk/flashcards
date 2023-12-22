import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgotPasswordForm.module.css'
// import {Input} from "@/components/ui/input";
const emailSchema = z.object({
  email: z.string().email(),
  rememberMe: z.boolean(),
})

export type FormValues = z.infer<typeof emailSchema>
export const ForgotPasswordForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues: { email: '', rememberMe: false },
    resolver: zodResolver(emailSchema),
  })
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <div className={s.card}>
      {' '}
      {/* div`ll be replaced by card component*/}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography className={s.formHeader} variant={'large'}>
          Forgot your password?
        </Typography>
        {/*<Typography variant={'body2'}>Email</Typography>*/}
        {/*<Input placeholder={'Email'} register={'hnm'} controlName={"hfhf"}/>*/}
        <input {...register('email')} />
        {errors.email?.message && errors.email.message}

        <Typography className={s.instruction} variant={'body2'}>
          Enter your email address and we will send you further instructions{' '}
        </Typography>
        <Button fullWidth>Send Instructions</Button>
        <Typography className={s.footerText} variant={'body2'}>
          Did you remember your password?
        </Typography>
        <Button as={'a'} className={s.submitButton} type={'submit'} variant={'link'}>
          Try logging in
        </Button>
      </form>
    </div>
  )
}
