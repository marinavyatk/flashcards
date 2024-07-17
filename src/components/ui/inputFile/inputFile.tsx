import { ComponentPropsWithoutRef, forwardRef, useId } from 'react'

import clsx from 'clsx'

import s from './inputFile.module.scss'

export type InputFileProps = {
  containerProps?: ComponentPropsWithoutRef<'div'>
  labelProps?: ComponentPropsWithoutRef<'label'>
} & ComponentPropsWithoutRef<'input'>

export const InputFile = forwardRef<HTMLInputElement, InputFileProps>((props, ref) => {
  const { children, className, containerProps, labelProps, ...restProps } = props
  const inputClassNames = clsx(s.inputFile, className)
  const labelClassNames = clsx(s.inputFileLabel, labelProps?.className)
  const id = useId()

  return (
    <div {...containerProps}>
      <input id={id} ref={ref} type={'file'} {...restProps} className={inputClassNames} />
      <label {...labelProps} className={labelClassNames} htmlFor={id}>
        {children}
      </label>
    </div>
  )
})
