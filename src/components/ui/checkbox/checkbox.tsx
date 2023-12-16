import { ComponentPropsWithoutRef } from 'react'

import { CheckboxChecked } from '@/components/ui/checkbox/CheckboxChecked'
import { CheckboxUnchecked } from '@/components/ui/checkbox/checkboxUnchecked'
import * as Checkbox from '@radix-ui/react-checkbox'

import s from './checkbox.module.scss'

export type CheckboxComponentProps = {
  checkboxTitle?: string
  checked: boolean
  disabled?: boolean
  onCheckedChange?: () => void
  required?: boolean
} & ComponentPropsWithoutRef<'button'>
export const CheckboxComponent = (props: CheckboxComponentProps) => {
  const {
    checkboxTitle,
    checked = false,
    disabled,
    onCheckedChange,
    required = false,
    ...rest
  } = props

  return (
    <div className={`${s.checkbox} ${disabled ? s.disabled : ''}`}>
      <Checkbox.Root
        checked={checked}
        className={s.checkboxRoot}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        required={required}
        {...rest}
      >
        <Checkbox.Indicator className={s.checkboxIndicator}>
          <CheckboxChecked />
        </Checkbox.Indicator>
        {!checked && <CheckboxUnchecked />}
      </Checkbox.Root>
      <label>{checkboxTitle}</label>
    </div>
  )
}
