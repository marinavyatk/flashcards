import { ComponentPropsWithoutRef } from 'react'
import { useNavigate } from 'react-router-dom'

import OutIcon from '@/assets/svg/dropdownMenu/outIcon.svg?react'
import ProfileIcon from '@/assets/svg/dropdownMenu/userIcon.svg?react'
import { routes } from '@/common/router'
import {
  DropdownItem,
  DropdownMenuComponent,
  DropdownSeparator,
} from '@/components/ui/dropdownMenu'
import { Typography } from '@/components/ui/typography'
import { useSignOutMutation } from '@/services/authApi/authApi'

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
    try {
      await signOut().unwrap()
      localStorage.clear()
      navigate(routes.signIn)
    } catch (error: any) {
      console.log(error)
    }
  }
  const handleOpenProfile = () => {
    navigate(routes.editProfile)
  }

  return (
    <DropdownMenuComponent
      trigger={
        <div className={s.trigger}>
          <Typography as={'span'} className={s.name} variant={'subtitle1'}>
            {name}
          </Typography>
          <img alt={'open menu'} className={s.trigger} src={avatar} />
        </div>
      }
      {...restProps}
      className={className}
      contentProps={{ alignOffset: -5 }}
    >
      <DropdownItem>
        <div className={s.userSection}>
          <img alt={'Your photo'} src={avatar} />
          <div className={s.userInfo}>
            <Typography as={'span'} className={s.userName} variant={'subtitle2'}>
              {name}
            </Typography>
            <Typography as={'span'} className={s.userEmail} variant={'caption'}>
              {email}
            </Typography>
          </div>
        </div>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem className={s.dropItem} onClick={handleOpenProfile}>
        <ProfileIcon />
        <Typography as={'span'} variant={'caption'}>
          My Profile
        </Typography>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem className={s.dropItem} onClick={handleSignOut}>
        <OutIcon />
        <Typography as={'span'} variant={'caption'}>
          Sign Out
        </Typography>
      </DropdownItem>
    </DropdownMenuComponent>
  )
}
