import { ComponentPropsWithoutRef } from 'react'
import { useForm } from 'react-hook-form'

import ProfilePhotoDefault from '@/assets/svg/profilePhotoDefault.svg?react'
import { Card } from '@/components/ui/card'
import { FormTextField } from '@/components/ui/textField/formTextField'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './editNickname.module.scss'

import { Button } from '../../ui/button'

const forgotPasswordSchema = z.object({
  nickname: z.string().min(3).max(30),
})

export type FormValues = z.infer<typeof forgotPasswordSchema>

type EditNicknameProps = {
  onFormSubmit: (data: FormValues) => void
  profilePhoto?: string
} & ComponentPropsWithoutRef<'div'>

export const EditNickname = (props: EditNicknameProps) => {
  const { className, onFormSubmit, profilePhoto, ...restProps } = props
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      nickname: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(forgotPasswordSchema),
  })

  console.log('errors: ', errors)

  const classNames = clsx(s.editNickname, className)

  return (
    <Card className={classNames} {...restProps}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Typography as={'h1'} className={s.header} variant={'large'}>
          Personal Information
        </Typography>
        <div className={s.profilePhoto}>
          {profilePhoto ? (
            <img alt={'Profile photo'} src={profilePhoto} />
          ) : (
            <ProfilePhotoDefault />
          )}
        </div>

        <FormTextField
          containerProps={{ className: s.formTextField }}
          control={control}
          label={'Nickname'}
          name={'nickname'}
        />
        <Button fullWidth>Save Changes</Button>
      </form>
    </Card>
  )
}
