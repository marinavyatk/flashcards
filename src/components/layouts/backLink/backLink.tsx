import { ComponentPropsWithoutRef } from 'react'

import ArrowBackIcon from '@/assets/svg/arrowBack.svg?react'
import { Typography } from '@/components/ui/typography'

import s from './backLink.module.scss'

export type BackLinkProps = {} & ComponentPropsWithoutRef<'button'>

export const BackLink = (props: BackLinkProps) => {
  const { children, ...restProps } = props

  return (
    <Typography as={'button'} className={s.backLink} {...restProps} variant={'body2'}>
      <ArrowBackIcon /> {children}
    </Typography>
  )
}
