import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './typography.module.scss'

export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T
  variant?:
    | 'body1'
    | 'body2'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'large'
    | 'link1'
    | 'link2'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
} & ComponentPropsWithoutRef<T>
export const Typography = <T extends ElementType = 'p'>(
  props: TypographyProps<T> & ComponentPropsWithoutRef<T>
) => {
  const { as: Component = 'p', className, variant = 'body1', ...rest } = props
  // const classNames = (s[variant], className)

  // return <Component className={`${s[variant]}`} {...rest} />

  const classNames = `${s[variant]} ${className ? className : ''}`

  return <Component className={classNames} {...rest} />
}
