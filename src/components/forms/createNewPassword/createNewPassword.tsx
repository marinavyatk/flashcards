import { ComponentPropsWithoutRef } from 'react'
import { useForm } from 'react-hook-form'

import { Card } from '@/components/ui/card'
import { FormTextField } from '@/components/ui/textField/formTextField'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './createNewPassword.module.scss'

import { Button } from '../../ui/button'

const forgotPasswordSchema = z.object({
  password: z.string().min(3).max(30),
})

export type FormValues = z.infer<typeof forgotPasswordSchema>

type CreateNewPasswordProps = {
  onFormSubmit: (data: FormValues) => void
} & ComponentPropsWithoutRef<'div'>

export const CreateNewPassword = (props: CreateNewPasswordProps) => {
  const { className, onFormSubmit, ...restProps } = props
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(forgotPasswordSchema),
  })

  console.log('errors: ', errors)

  const classNames = clsx(s.createPassword, className)

  return (
    <Card className={classNames} {...restProps}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Typography as={'h1'} className={s.header} variant={'large'}>
          Create new password
        </Typography>
        <FormTextField
          containerProps={{ className: s.formTextField }}
          control={control}
          label={'Password'}
          name={'password'}
          type={'password'}
        />
        <Typography as={'p'} className={s.instruction} variant={'body2'}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button fullWidth>Create new password</Button>
      </form>
    </Card>
  )
}
