import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import Logo from '@/assets/logo.webp'
import { routes } from '@/common/router'
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
        <Link className={s.logoWithText} to={routes.private.main}>
          <span className={s.word}>Flash</span>
          <img alt={'Logo'} className={s.logo} src={Logo} />
          <span className={s.word}>Cards</span>
        </Link>
        {isAuthorized ? (
          userDropdownProps && <UserDropdown {...userDropdownProps} />
        ) : (
          <Button as={Link} to={'/sign-in'} variant={'secondary'}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
}
