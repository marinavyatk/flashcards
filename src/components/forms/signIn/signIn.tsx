import { ComponentPropsWithoutRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { SignInFormValues, signInSchema } from '@/common/formValidation'
import { routes } from '@/common/router'
import { Card } from '@/components/ui/card'
import { FormCheckbox } from '@/components/ui/checkbox/formCheckbox'
import { FormTextField } from '@/components/ui/textField/formTextField'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './signIn.module.scss'

import { Button } from '../../ui/button'

type SingInProps = {
  onFormSubmit: (data: SignInFormValues) => void
} & ComponentPropsWithoutRef<'div'>

export const SingIn = (props: SingInProps) => {
  const { className, onFormSubmit, ...restProps } = props
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    mode: 'onBlur',
    resolver: zodResolver(signInSchema),
  })

  const classNames = clsx(s.signIn, className)

  return (
    <Card className={classNames} {...restProps}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Typography as={'h1'} className={s.header} variant={'large'}>
          Sing In
        </Typography>
        <div className={s.textFields}>
          <FormTextField control={control} label={'Email'} name={'email'} />
          <FormTextField control={control} label={'Password'} name={'password'} type={'password'} />
        </div>
        <FormCheckbox
          containerProps={{ className: s.rememberMeCheckbox }}
          control={control}
          label={'Remember me'}
          name={'rememberMe'}
        />
        <Typography
          as={Link}
          className={s.forgotPassword}
          to={routes.public.forgotPassword}
          variant={'body2'}
        >
          Forgot Password?
        </Typography>
        <Button fullWidth>Sing In</Button>
        <Typography as={'span'} className={s.footerCapture} variant={'body2'}>
          Don't have an account?
        </Typography>
        <Typography as={Link} className={s.singUp} to={routes.public.signUp} variant={'subtitle1'}>
          Sing Up
        </Typography>
      </form>
    </Card>
  )
}
