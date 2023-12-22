import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  fullWidth?: boolean
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const {
    as: Component = 'button',
    className,
    fullWidth,
    variant = 'primary',
    ...restProps
  } = props
  const fullClassName = `${s.button} ${s[variant]} ${fullWidth ? s.fullWidth : ''}${
    className ? className : ''
  }`

  return <Component className={fullClassName} {...restProps}></Component>
}
