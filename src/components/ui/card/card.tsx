import { ComponentPropsWithoutRef, ElementType } from 'react'

import clsx from 'clsx'

import s from './card.module.scss'

export type CardProps<T extends ElementType = 'div'> = {
  as?: T
} & ComponentPropsWithoutRef<T>

export const Card = <T extends ElementType = 'div'>(props: CardProps<T>) => {
  const { as: Component = 'div', className, ...restProps } = props

  const classNames = clsx(s.card, className)

  return <Component className={classNames} {...restProps} />
}
