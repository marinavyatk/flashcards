import { ComponentPropsWithoutRef } from 'react'
import { useForm } from 'react-hook-form'

import ProfilePhotoDefault from '@/assets/svg/profilePhotoDefault.svg?react'
import { EditProfileFormValues, editProfileSchema } from '@/components/forms/formValidation'
import { Card } from '@/components/ui/card'
import { FormTextField } from '@/components/ui/textField/formTextField'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './editProfile.module.scss'

import { Button } from '../../ui/button'

type EditProfileProps = {
  onFormSubmit: (data: EditProfileFormValues) => void
  profilePhoto?: string
} & ComponentPropsWithoutRef<'div'>

export const EditProfile = (props: EditProfileProps) => {
  const { className, onFormSubmit, profilePhoto, ...restProps } = props
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EditProfileFormValues>({
    defaultValues: {
      name: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(editProfileSchema),
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
          name={'name'}
        />
        <Button fullWidth>Save Changes</Button>
      </form>
    </Card>
  )
}
