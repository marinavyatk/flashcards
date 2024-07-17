import { ChangeEvent, ForwardedRef, forwardRef } from 'react'

import { InputFile, InputFileProps } from '@/components/ui/inputFile'
import clsx from 'clsx'

import s from './inputFileCover.module.scss'

export type InputFileCoverProps = {
  onChange?: (file: File | undefined) => void
  onFileChange?: (file: File | undefined) => void
} & InputFileProps

export const InputFileCover = forwardRef(
  (props: InputFileCoverProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { children, onChange, onFileChange, ...restProps } = props

    const classNames = clsx(s.inputFileCover, restProps?.containerProps?.className)
    const labelClassNames = clsx(s.labelButton, restProps?.labelProps?.className)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget && event.currentTarget.files) {
        onChange?.(event.currentTarget?.files?.[0])
        onFileChange?.(event.currentTarget?.files?.[0])
      }
    }

    return (
      <InputFile
        accept={'image/*'}
        containerProps={{ className: classNames }}
        onChange={handleChange}
        {...restProps}
        labelProps={{ className: labelClassNames }}
        ref={ref}
      >
        {children}
      </InputFile>
    )
  }
)
