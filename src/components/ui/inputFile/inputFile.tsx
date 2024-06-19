import { ComponentPropsWithoutRef, forwardRef, useId } from 'react'

import EditIcon from '@/assets/svg/editIcon.svg?react'
import clsx from 'clsx'

import s from './inputFile.module.scss'

export type InputFileProps = {
  fileProps?: ComponentPropsWithoutRef<'input'>
} & ComponentPropsWithoutRef<'div'>

export const InputFile = forwardRef<HTMLInputElement, InputFileProps>((props, ref) => {
  const { className, fileProps, ...restProps } = props
  const classNames = clsx(s.inputFile, className)
  const id = useId()

  return (
    <div className={classNames} {...restProps}>
      <input id={id} type={'file'} {...fileProps} accept={'image/*'} ref={ref} />
      <label htmlFor={id}>
        <EditIcon />
      </label>
    </div>
  )
})
