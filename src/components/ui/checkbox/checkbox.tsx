import { ComponentPropsWithoutRef, forwardRef } from 'react'

import CheckboxCheckedIcon from '@/assets/svg/checkbox-checked.svg?react'
import CheckboxUncheckedIcon from '@/assets/svg/checkbox-unchecked.svg?react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckboxProps } from '@radix-ui/react-checkbox'
import clsx from 'clsx'

import s from './checkbox.module.scss'

export type CheckboxComponentProps = {
  divProps?: ComponentPropsWithoutRef<'div'>
  label?: string
} & CheckboxProps

export const CheckboxComponent = forwardRef<HTMLButtonElement, CheckboxComponentProps>(
  (props: CheckboxComponentProps, ref) => {
    const { divProps, label, ...rest } = props

    const classNames = clsx(s.checkbox, divProps?.className)

    return (
      <div className={classNames} {...divProps}>
        <Checkbox.Root className={s.checkboxRoot} id={rest.name} ref={ref} {...rest}>
          <Checkbox.Indicator className={s.checkboxIndicator}>
            <CheckboxCheckedIcon className={s.checkboxCheckedIcon} />
          </Checkbox.Indicator>
          {!rest.checked && <CheckboxUncheckedIcon className={s.CheckboxUncheckedIcon} />}
        </Checkbox.Root>
        <label htmlFor={rest.name}>{label}</label>
      </div>
    )
  }
)
