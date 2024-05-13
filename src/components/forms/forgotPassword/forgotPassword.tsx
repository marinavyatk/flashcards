import { ComponentPropsWithoutRef } from 'react'
import { useForm } from 'react-hook-form'

import { Card } from '@/components/ui/card'
import { FormTextField } from '@/components/ui/textField/formTextField'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './forgotPassword.module.scss'

import { Button } from '../../ui/button'

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export type FormValues = z.infer<typeof forgotPasswordSchema>

type ForgotPasswordProps = {
  onFormSubmit: (data: FormValues) => void
} & ComponentPropsWithoutRef<'div'>

export const ForgotPassword = (props: ForgotPasswordProps) => {
  const { className, onFormSubmit, ...restProps } = props
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(forgotPasswordSchema),
  })

  console.log('errors: ', errors)

  const classNames = clsx(s.forgotPassword, className)

  return (
    <Card className={classNames} {...restProps}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Typography as={'h1'} className={s.header} variant={'large'}>
          Forgot your password?
        </Typography>
        <FormTextField
          containerProps={{ className: s.formTextField }}
          control={control}
          label={'Email'}
          name={'email'}
        />
        <Typography as={'p'} className={s.instruction} variant={'body2'}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button fullWidth>Send Instructions</Button>
        <Typography as={'span'} className={s.footerCapture} variant={'body2'}>
          Did you remember your password?
        </Typography>
        <Typography as={'a'} className={s.singUp} href={'#'} variant={'subtitle1'}>
          Try logging in
        </Typography>
      </form>
    </Card>
  )
}
