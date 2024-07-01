import { ChangeEvent, ComponentPropsWithoutRef, LegacyRef, forwardRef, useId, useRef } from 'react'

import { useCombinedRef } from '@/common/customHooks'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './InputFileCover.module.scss'

export type InputFileCoverProps = {
  containerProps?: ComponentPropsWithoutRef<'div'>
  errorMessage?: string
  onChange?: (file: File | undefined) => void
  onFileChange?: (file: File | undefined) => void
} & ComponentPropsWithoutRef<'input'>

export const InputFileCover = forwardRef(
  (props: InputFileCoverProps, ref: LegacyRef<HTMLInputElement> | undefined) => {
    const { children, containerProps, errorMessage, onChange, onFileChange, ...restProps } = props
    const classNames = clsx(s.inputFileWithPreview, containerProps?.className)
    const id = useId()
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget && event.currentTarget.files) {
        onChange?.(event.currentTarget?.files?.[0])
        onFileChange?.(event.currentTarget?.files?.[0])
      }
    }
    const inputFileRef = useRef()
    const finalRef = useCombinedRef(inputFileRef, ref)

    const clearInput = () => {
      const dataTransfer = new DataTransfer()

      if (inputFileRef.current) {
        inputFileRef.current.files = dataTransfer.files
      }
    }

    return (
      <div className={classNames}>
        <input
          id={id}
          type={'file'}
          {...restProps}
          accept={'image/*'}
          onChange={handleChange}
          ref={finalRef}
        />
        <label htmlFor={id}>{children}</label>
        {errorMessage && (
          <Typography className={s.errorMessage} variant={'caption'}>
            {errorMessage}
          </Typography>
        )}
      </div>
    )
  }
)
