import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import CheckEmailIcon from '@/assets/svg/checkEmailIcon.svg?react'
import { routes } from '@/common/router'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './confirmEmail.module.scss'

import { Button } from '../../ui/button'

type ConfirmEmailProps = ComponentPropsWithoutRef<'div'>

export const ConfirmEmail = (props: ConfirmEmailProps) => {
  const { className, onSubmit, ...restProps } = props
  const classNames = clsx(s.confirmEmail, className)

  return (
    <Card className={classNames} {...restProps}>
      <Typography as={'h1'} className={s.header} variant={'large'}>
        Email Confirmation
      </Typography>
      <CheckEmailIcon className={s.checkEmailIcon} />
      <Typography as={'p'} className={s.caption} variant={'body2'}>
        Your email is successfully confirmed!
      </Typography>
      <Button as={Link} fullWidth to={routes.public.signIn}>
        Back to Sign In
      </Button>
    </Card>
  )
}
