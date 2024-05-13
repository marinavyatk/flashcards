import { ComponentPropsWithoutRef } from 'react'

import CheckEmailIcon from '@/assets/svg/checkEmailIcon.svg?react'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './checkEmail.module.scss'

import { Button } from '../../ui/button'

type CheckEmailProps = ComponentPropsWithoutRef<'div'>

export const CheckEmail = (props: CheckEmailProps) => {
  const { className, onSubmit, ...restProps } = props
  const classNames = clsx(s.checkEmail, className)

  return (
    <Card className={classNames} {...restProps}>
      <Typography as={'h1'} className={s.header} variant={'large'}>
        Check Email
      </Typography>
      <CheckEmailIcon className={s.checkEmailIcon} />
      <Typography as={'p'} className={s.instruction} variant={'body2'}>
        We’ve sent an Email with instructions to example@mail.com
      </Typography>
      <Button fullWidth>Back to Sign In</Button>
    </Card>
  )
}
