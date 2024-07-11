import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from './loaderLine.module.scss'

type LoaderLineProps = ComponentPropsWithoutRef<'div'>

export const LoaderLine = (props: LoaderLineProps) => {
  const { className, ...restProps } = props
  const classNames = clsx(s.loader, className)

  return (
    <div className={classNames} {...restProps}>
      <div className={s.loaderBar}></div>
    </div>
  )
}
