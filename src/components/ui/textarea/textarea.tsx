import { ChangeEvent, ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react'
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize'

import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from '../textField/textField.module.scss'

export type TextAreaProps = {
  containerProps?: ComponentPropsWithoutRef<'div'>
  errorMessage?: string
  label?: string
  onValueChange?: (value: string) => void
} & Omit<TextareaAutosizeProps, 'style'>

export const TextArea = forwardRef(
  (props: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const { className, containerProps, errorMessage, label, onValueChange, ...restProps } = props
    const containerClassNames = clsx(s.textField, containerProps?.className, {
      [s.disabled]: restProps.disabled,
      [s.error]: errorMessage,
    })
    const inputClassNames = clsx(s.input, className)

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
      restProps.onChange?.(event)
      onValueChange?.(event.target.value)
    }

    return (
      <div {...containerProps} className={containerClassNames}>
        <Typography as={'label'} className={s.label} htmlFor={restProps.name} variant={'body2'}>
          {label}
        </Typography>
        <div className={s.textFieldContainer}>
          <div className={s.startElements}>
            <TextareaAutosize
              {...restProps}
              className={inputClassNames}
              disabled={restProps.disabled}
              id={restProps.name}
              onChange={handleChange}
              ref={ref}
            />
          </div>
        </div>
        {errorMessage && (
          <Typography className={s.errorMessage} variant={'caption'}>
            {errorMessage}
          </Typography>
        )}
      </div>
    )
  }
)
