import { ComponentPropsWithoutRef, ElementType, Ref, forwardRef, useRef, useState } from 'react'

import DeleteIcon from '@/assets/svg/deleteIcon.svg?react'
import SearchIcon from '@/assets/svg/searchIcon.svg?react'
import ShowPasswordIcon from '@/assets/svg/showPasswordIcon.svg?react'
import { useCombinedRef } from '@/common/customHooks'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './textField.module.scss'

export type TextFieldProps<T extends ElementType = 'input'> = {
  as?: T
  divProps?: ComponentPropsWithoutRef<'div'>
  errorMessage?: string
  label?: string
  variant?: 'password' | 'primary' | 'search'
} & ComponentPropsWithoutRef<T>

export const TextField = forwardRef(
  //need to type correctly
  <T extends ElementType = 'input'>(
    props: TextFieldProps<T>,
    ref: Ref<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    const {
      as: Component = 'input',
      className,
      divProps,
      errorMessage,
      label,
      variant = 'primary',
      ...restProps
    } = props
    const [hidden, setHidden] = useState(true)
    const classNames = clsx(s.textField, s[variant], className, {
      [s.disabled]: restProps.disabled,
      [s.error]: errorMessage,
    })
    const type = variant === 'password' && hidden ? 'password' : 'text'
    const handleTogglePassword = () => {
      setHidden(!hidden)
    }

    const inputRef = useRef<HTMLInputElement>(null)

    const handleRemoveInputContent = () => {
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }

    const finalRef = useCombinedRef(inputRef, ref)

    return (
      <div {...divProps} className={classNames}>
        <Typography as={'label'} className={s.label} htmlFor={restProps.name} variant={'body2'}>
          {label}
        </Typography>
        <div className={s.textFieldContainer}>
          <div className={s.startElements}>
            {variant === 'search' && <SearchIcon className={s.searchIcon} />}

            <Component
              {...restProps}
              className={s.input}
              disabled={restProps.disabled}
              id={restProps.name}
              ref={finalRef}
              type={type}
            />
          </div>
          {variant !== 'primary' && (
            <button className={s.endButton}>
              {variant === 'password' ? (
                <ShowPasswordIcon onClick={handleTogglePassword} />
              ) : (
                <DeleteIcon className={s.deleteIcon} onClick={handleRemoveInputContent} />
              )}
            </button>
          )}
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
