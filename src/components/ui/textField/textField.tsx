import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementType,
  ForwardedRef,
  ReactElement,
  forwardRef,
  useRef,
  useState,
} from 'react'

import DeleteIcon from '@/assets/svg/deleteIcon.svg?react'
import HidePasswordIcon from '@/assets/svg/hidePasswordIcon.svg?react'
import SearchIcon from '@/assets/svg/searchIcon.svg?react'
import ShowPasswordIcon from '@/assets/svg/showPasswordIcon.svg?react'
import { useCombinedRef } from '@/common/customHooks/useCombinedRef'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './textField.module.scss'

function getFinalType(
  type?: TextFieldProps['type'],
  showPassword?: boolean
): TextFieldProps['type'] {
  if (type !== 'password') {
    return type
  }
  if (showPassword) {
    return 'text'
  }

  return 'password'
}

export type TextFieldProps<T extends ElementType = 'input'> = {
  as?: T
  containerProps?: ComponentPropsWithoutRef<'div'>
  errorMessage?: string
  label?: string
  onValueChange?: (value: string) => void
  variant?: 'password' | 'primary' | 'search'
} & ComponentPropsWithoutRef<T>

export const TextField = forwardRef(
  <T extends ElementType = 'input'>(
    props: TextFieldProps<T>,
    ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      as: Component = 'input',
      className,
      containerProps,
      errorMessage,
      label,
      onValueChange,
      type,
      ...restProps
    } = props
    const [isPasswordShown, setIsPasswordShown] = useState(false)
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
    const finalRef = useCombinedRef(ref, inputRef)
    const containerClassNames = clsx(s.textField, containerProps?.className, {
      [s.disabled]: restProps.disabled,
      [s.error]: errorMessage,
    })
    const inputClassNames = clsx(s.input, className)
    const finalType = getFinalType(type, isPasswordShown)
    const handleTogglePassword = () => {
      setIsPasswordShown(!isPasswordShown)
    }
    const isPasswordVisibilityButtonShown = type === 'password'
    const isDeleteButtonShown = type === 'search'

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      restProps.onChange?.(event)
      onValueChange?.(event.target.value)
    }

    const handleDeleteInput = () => {
      if (inputRef.current) {
        inputRef.current.value = ''
        onValueChange?.('')
      }
    }

    return (
      <div {...containerProps} className={containerClassNames}>
        <Typography as={'label'} className={s.label} htmlFor={restProps.name} variant={'body2'}>
          {label}
        </Typography>
        <div className={s.textFieldContainer}>
          <div className={s.startElements}>
            {finalType === 'search' && <SearchIcon className={s.searchIcon} />}

            <Component
              {...restProps}
              className={inputClassNames}
              disabled={restProps.disabled}
              id={restProps.name}
              onChange={handleChange}
              ref={finalRef}
              type={finalType}
            />
          </div>
          {isPasswordVisibilityButtonShown && (
            <button className={s.endButton} type={'button'}>
              {isPasswordShown ? (
                <HidePasswordIcon onClick={handleTogglePassword} />
              ) : (
                <ShowPasswordIcon onClick={handleTogglePassword} />
              )}
            </button>
          )}
          {isDeleteButtonShown && (
            <button className={s.endButton} type={'button'}>
              <DeleteIcon className={s.deleteIcon} onClick={handleDeleteInput} />
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
) as (
  props: { ref?: ForwardedRef<HTMLInputElement | HTMLTextAreaElement> } & TextFieldProps
) => ReactElement
