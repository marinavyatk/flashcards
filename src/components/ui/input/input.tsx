import { ComponentPropsWithoutRef, ElementType } from 'react'
import { UseFormRegister } from 'react-hook-form'
import s from './input.module.scss'

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
  type?: 'password'
  fullWidth?: boolean
} & ComponentPropsWithoutRef<T>

export const Input = <T extends ElementType = 'input'>(
  props: InputProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof InputProps<T>>
) => {
  const {
    variant = '',
    className,
    icon = '',
    loupe = '',
    cross = '',
    placeholder = '',
    textInput = '',
    errorMessage = '',
    controlName = '',
    register,
    type,
    fullWidth,
    as: Component = 'input',
  } = props

  const fullClassName = `${s.button} ${s[variant]} ${fullWidth ? s.fullWidth : ''}${
    className ? className : ''
  }`

  return (
    <div>
      <div className={s.textInput}>{textInput}</div>
      <div className={s.inputClass}>
        <Component
          className={fullClassName}
          placeholder={placeholder}
          type={type}
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
