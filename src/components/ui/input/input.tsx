import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './input.module.scss'
import { UseFormRegister } from 'react-hook-form'

export type InputProps<T extends ElementType = 'input'> = {
  as?: T
  variant?: 'primary' | 'tertiary'
  className?: string
  placeholder: string
  icon?: string
  loupe?: string
  cross?: string
  textInput?: string
  errorMessage?: string
  controlName: string
  register: UseFormRegister<any>
} & ComponentPropsWithoutRef<T>

export const Input = <T extends ElementType = 'input'>(
  props: InputProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof InputProps<T>>
) => {
  const {
    variant = '',
    className,
    icon = '',
    loupe = '',
    as: Component = 'input',
    cross = '',
    placeholder = '',
    textInput = '',
    errorMessage = '',
    controlName = '',
    register,
  } = props

  return (
    <div>
      <div className={s.textInput}>{textInput}</div>
      <div className={s.inputClass}>
        <Component
          className={`${s[variant]}  ${className} `}
          placeholder={placeholder}
          {...register(controlName)}
        />
        {<div className={s.errorMessage}>{errorMessage}</div>}
        {icon && <div className={s.passwordControl}></div>}
        {loupe && <div className={s.loupeSearch}></div>}
        {cross && <div className={s.crossDelete}></div>}
      </div>
    </div>
  )
}
