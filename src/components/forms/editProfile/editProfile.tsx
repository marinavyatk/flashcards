import { ChangeEvent, ComponentPropsWithoutRef, MouseEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import EditIcon from '@/assets/svg/editIcon.svg?react'
import LogOutIcon from '@/assets/svg/icon-out.svg?react'
import ProfilePhotoDefault from '@/assets/svg/profilePhotoDefault.svg?react'
import { EditProfileFormValues, editProfileSchema } from '@/common/formValidation'
import { BackLink } from '@/components/layouts/backLink/backLink'
import { ConfirmDeleteAccountModal } from '@/components/layouts/modals/confirnDeleteAccountModal/confirnDeleteAccountModal'
import { Card } from '@/components/ui/card'
import { InputFileUserPhoto } from '@/components/ui/inputFile/inputFileUserPhoto'
import { Picture } from '@/components/ui/picture'
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
  onDeleteAccount: () => void
  onFormSubmit: (data: UpdateUserData) => void
  onSignOut: () => void
  profilePhoto?: string
} & ComponentPropsWithoutRef<'div'>

export const EditProfile = (props: EditProfileProps) => {
  const {
    className,
    email,
    name,
    onDeleteAccount,
    onFormSubmit,
    onSignOut,
    profilePhoto,
    ...restProps
  } = props
  const classNames = clsx(s.editProfile, className)
  const navigate = useNavigate()
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useForm<EditProfileFormValues>({
    defaultValues: {
      name: name,
    },
    mode: 'onBlur',
    resolver: zodResolver(editProfileSchema),
  })

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
  const goBack = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <div className={s.editProfileContainer}>
      <BackLink onClick={goBack} to={'..'}>
        Back to Previous Page
      </BackLink>
      <Card className={classNames} {...restProps}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography as={'h1'} className={s.header} variant={'large'}>
            Personal Information
          </Typography>

          <div className={s.profilePhoto}>
            {profilePhoto ? (
              <Picture
                alt={'Profile photo'}
                containerProps={{ className: s.img }}
                src={profilePhoto}
              />
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
              <Button className={s.submitButton} disabled={isSubmitting} fullWidth>
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
                <button onClick={handleEdit} type={'button'}>
                  <EditIcon />
                </button>
              </div>
              <Typography className={s.email} variant={'body2'}>
                {email}
              </Typography>
              <div className={s.buttons}>
                <Button
                  className={s.logoutButton}
                  onClick={onSignOut}
                  type={'button'}
                  variant={'secondary'}
                >
                  <LogOutIcon /> Sign out
                </Button>
                <ConfirmDeleteAccountModal onConfirm={onDeleteAccount} />
              </div>
            </>
          )}
        </form>
      </Card>
    </div>
  )
}
