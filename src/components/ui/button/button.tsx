import { ComponentPropsWithoutRef, ElementType, Ref, forwardRef } from 'react'

import clsx from 'clsx'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  fullWidth?: boolean
  variant?: 'primary' | 'secondary'
} & { ref?: Ref<HTMLElement> } & ComponentPropsWithoutRef<T>

export const Button = forwardRef(
  <T extends ElementType = 'button'>(props: ButtonProps<T>, ref: Ref<HTMLElement>) => {
    const {
      as: Component = 'button',
      className,
      fullWidth = false,
      variant = 'primary',
      ...restProps
    } = props

    const classNames = clsx(s.button, s[variant], fullWidth && [s.fullWidth], className)

    return <Component className={classNames} {...restProps} ref={ref} />
  }
) as <T extends ElementType = 'button'>(
  props: { ref?: Ref<HTMLElement> } & ButtonProps<T>
) => JSX.Element
