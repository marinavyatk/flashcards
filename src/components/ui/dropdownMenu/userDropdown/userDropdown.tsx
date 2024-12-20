import { ComponentPropsWithoutRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import ProfilePhotoDefault from '@/assets/defaultUserPhoto.png'
import OutIcon from '@/assets/svg/outIcon.svg?react'
import ProfileIcon from '@/assets/svg/userIcon.svg?react'
import { routes } from '@/common/router'
import { DropdownItem, DropdownMenu, DropdownSeparator } from '@/components/ui/dropdownMenu'
import { Picture } from '@/components/ui/picture'
import { Typography } from '@/components/ui/typography'
import { useSignOutMutation } from '@/services/auth/authApi'

import s from './userDropdown.module.scss'

export type UserDropdownProps = {
  avatar: string
  email: string
  name: string
} & ComponentPropsWithoutRef<'div'>

export const UserDropdown = (props: UserDropdownProps) => {
  const { avatar, className, email, name, ...restProps } = props
  const [signOut] = useSignOutMutation()
  const navigate = useNavigate()
  const handleSignOut = async () => {
    await signOut()
      .unwrap()
      .then(() => {
        localStorage.clear()
        navigate(routes.public.signIn)
      })
  }

  return (
    <DropdownMenu
      trigger={
        <button className={s.trigger} type={'button'}>
          <Typography as={'span'} className={s.name} variant={'subtitle1'}>
            {name}
          </Typography>
          <Picture
            alt={'Avatar'}
            containerProps={{ className: s.avatar }}
            src={avatar || ProfilePhotoDefault}
          />
        </button>
      }
      {...restProps}
      className={className}
      contentProps={{ alignOffset: -5 }}
    >
      <DropdownItem className={s.userSection}>
        <Picture
          alt={'Your photo'}
          containerProps={{ className: s.avatar }}
          src={avatar || ProfilePhotoDefault}
        />
        <div className={s.userInfo}>
          <Typography variant={'subtitle2'}>{name}</Typography>
          <Typography className={s.userEmail} variant={'caption'}>
            {email}
          </Typography>
        </div>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem>
        <Link className={s.dropItem} to={routes.private.editProfile}>
          <ProfileIcon />
          <Typography as={'span'} variant={'caption'}>
            My Profile
          </Typography>
        </Link>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem className={s.dropItem} onClick={handleSignOut}>
        <OutIcon />
        <Typography as={'span'} variant={'caption'}>
          Sign Out
        </Typography>
      </DropdownItem>
    </DropdownMenu>
  )
}
