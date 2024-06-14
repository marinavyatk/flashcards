import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import Logo from '@/assets/svg/logo.svg?react'
import { Button } from '@/components/ui/button'
import {
  UserDropdown,
  UserDropdownProps,
} from '@/components/ui/dropdownMenu/userDropdown/userDropdown'
import clsx from 'clsx'

import s from './header.module.scss'

export type HeaderProps = {
  isAuthorized: boolean
  userDropdownProps?: UserDropdownProps
} & ComponentPropsWithoutRef<'header'>

export const Header = (props: HeaderProps) => {
  const { className, isAuthorized, userDropdownProps, ...restProps } = props
  const classNames = clsx(s.header, className)

  return (
    <header className={classNames} {...restProps}>
      <div className={s.innerContainer}>
        <Logo className={s.logo} />
        {isAuthorized ? (
          userDropdownProps && (
            <UserDropdown
              avatar={userDropdownProps?.avatar}
              email={userDropdownProps?.email}
              name={userDropdownProps?.name}
            />
          )
        ) : (
          <Button as={Link} to={'/sign-in'} variant={'secondary'}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
}
