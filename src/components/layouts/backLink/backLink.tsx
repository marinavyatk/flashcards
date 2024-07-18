import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import ArrowBackIcon from '@/assets/svg/arrowBack.svg?react'

import s from './backLink.module.scss'

export type BackLinkProps = { to: string } & ComponentPropsWithoutRef<'a'>

export const BackLink = (props: BackLinkProps) => {
  const { children, to, ...restProps } = props

  return (
    <Link to={to} {...restProps} className={s.backLink}>
      <ArrowBackIcon /> {children}
    </Link>
  )
}
