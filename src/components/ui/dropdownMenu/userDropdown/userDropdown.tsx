import { ComponentPropsWithoutRef } from 'react'

import OutIcon from '@/assets/svg/dropdownMenu/outIcon.svg?react'
import ProfileIcon from '@/assets/svg/dropdownMenu/userIcon.svg?react'
import { DropdownMenuComponent } from '@/components/ui/dropdownMenu'
import { DropdownItem } from '@/components/ui/dropdownMenu/dropdownItem/dropdownItem'
import { DropdownSeparator } from '@/components/ui/dropdownMenu/dropdownSeparator/dropdownSeparator'
import { Typography } from '@/components/ui/typography'

import s from './userDropdown.module.scss'

export type UserDropdownProps = {
  avatar: string
  email: string
  name: string
} & ComponentPropsWithoutRef<'div'>
export const UserDropdown = (props: UserDropdownProps) => {
  const { avatar, className, email, name, ...restProps } = props

  return (
    <DropdownMenuComponent
      trigger={<img alt={'open menu'} className={s.trigger} src={avatar} />}
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
      <DropdownItem className={s.dropItem}>
        <ProfileIcon />
        <Typography as={'span'} variant={'caption'}>
          My Profile
        </Typography>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem className={s.dropItem}>
        <OutIcon />
        <Typography as={'span'} variant={'caption'}>
          Sign Out
        </Typography>
      </DropdownItem>
    </DropdownMenuComponent>
  )
}
