import { ComponentPropsWithoutRef } from 'react'

import { clsx } from 'clsx'

import s from './loader.module.scss'

export type LoaderProps = ComponentPropsWithoutRef<'span'>

export const Loader = (props: LoaderProps) => {
  const { className, ...restProps } = props
  const classNames = clsx(s.loader, className)

  return <span className={classNames} {...restProps}></span>
}

export const PageLoader = () => {
  return (
    <div className={s.loaderContainer}>
      <Loader />
    </div>
  )
}
