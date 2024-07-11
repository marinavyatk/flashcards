import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import EditIcon from '@/assets/svg/editIcon.svg?react'
import LogOutIcon from '@/assets/svg/icon-out.svg?react'
import ProfilePhotoDefault from '@/assets/svg/profilePhotoDefault.svg?react'
import { EditProfileFormValues, editProfileSchema } from '@/common/formValidation'
import { Card } from '@/components/ui/card'
import { InputFileUserPhoto } from '@/components/ui/inputFile/inputFileUserPhoto'
import { FormTextField } from '@/components/ui/textField/formTextField'
import { Typography } from '@/components/ui/typography'
import { UpdateUserData } from '@/services/auth/authApiTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './editProfile.module.scss'

import { Button } from '../../ui/button'

type EditProfileProps = {
  email: string
  name: string
  onFormSubmit: (data: UpdateUserData) => void
  onSignOut: () => void
  profilePhoto?: string
} & ComponentPropsWithoutRef<'div'>

export const EditProfile = (props: EditProfileProps) => {
  const { className, email, name, onFormSubmit, onSignOut, profilePhoto, ...restProps } = props
  const classNames = clsx(s.editProfile, className)
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<EditProfileFormValues>({
    defaultValues: {
      name: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(editProfileSchema),
  })

  console.log('errors: ', errors)

  const [editMode, setEditMode] = useState(false)

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const attachedFile = event.currentTarget.files?.[0]

    onFormSubmit({ avatar: attachedFile })
  }

  const onSubmit = (data: EditProfileFormValues) => {
    onFormSubmit(data)
    setEditMode(false)
  }

  const handleEdit = () => {
    setEditMode(true)
  }

  const handleCancel = () => {
    setEditMode(false)
    reset()
  }

  return (
    <Card className={classNames} {...restProps}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography as={'h1'} className={s.header} variant={'large'}>
          Personal Information
        </Typography>

        <div className={s.profilePhoto}>
          {profilePhoto ? (
            <img alt={'Profile photo'} src={profilePhoto} />
          ) : (
            <ProfilePhotoDefault />
          )}
          {!editMode && (
            <InputFileUserPhoto containerProps={{ className: s.file }} onChange={onFileChange} />
          )}
        </div>
        {editMode ? (
          <>
            <FormTextField
              containerProps={{ className: s.formTextField }}
              control={control}
              label={'Nickname'}
              name={'name'}
            />
            <Button className={s.submitButton} fullWidth>
              Save Changes
            </Button>
            <Button
              className={s.cancelButton}
              fullWidth
              onClick={handleCancel}
              type={'button'}
              variant={'secondary'}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <div className={s.name}>
              <Typography variant={'h2'}>{name}</Typography>
              <button onClick={handleEdit}>
                <EditIcon />
              </button>
            </div>

            <Typography className={s.email} variant={'body2'}>
              {email}
            </Typography>
            <Button
              className={s.logoutButton}
              onClick={onSignOut}
              type={'button'}
              variant={'secondary'}
            >
              <LogOutIcon /> Logout
            </Button>
          </>
        )}
      </form>
    </Card>
  )
}
