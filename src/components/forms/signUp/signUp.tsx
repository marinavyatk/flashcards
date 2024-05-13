import { ComponentPropsWithoutRef } from 'react'
import { useForm } from 'react-hook-form'

import { Card } from '@/components/ui/card'
import { FormTextField } from '@/components/ui/textField/formTextField'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './signUp.module.scss'

import { Button } from '../../ui/button'

const signUpSchema = z
  .object({
    confirmPassword: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(3).max(30),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export type FormValues = z.infer<typeof signUpSchema>

type SingUpProps = {
  onFormSubmit: (data: FormValues) => void
} & ComponentPropsWithoutRef<'div'>

export const SingUp = (props: SingUpProps) => {
  const { className, onFormSubmit, ...restProps } = props
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  })

  console.log('errors: ', errors)

  const classNames = clsx(s.signUp, className)

  return (
    <Card className={classNames} {...restProps}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Typography as={'h1'} className={s.header} variant={'large'}>
          Sing Up
        </Typography>
        <div className={s.textFields}>
          <FormTextField control={control} label={'Email'} name={'email'} />
          <FormTextField control={control} label={'Password'} name={'password'} type={'password'} />
          <FormTextField
            control={control}
            label={'Confirm Password'}
            name={'confirmPassword'}
            type={'password'}
          />
        </div>
        <Button fullWidth>Sing Up</Button>
        <Typography as={'span'} className={s.footerCapture} variant={'body2'}>
          Already have an account?
        </Typography>
        <Typography as={'a'} className={s.singUp} href={'#'} variant={'subtitle1'}>
          Sing In
        </Typography>
      </form>
    </Card>
  )
}
