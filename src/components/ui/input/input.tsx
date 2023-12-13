import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './input.module.scss'

export type InputProps<T extends ElementType ='input'> = {
    as?:T
    variant?: 'primary'
    className?: string
    placeholder:string
} & ComponentPropsWithoutRef<T>

export const Input = <T extends ElementType = 'input'>(
    props: InputProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof InputProps<T>>
) => {
    const { variant = 'primary', className, as: Component = 'input',placeholder='Input' } = props

    return (
        <Component className={`${s[variant]}  ${className} `} placeholder={placeholder}  />
    )
}