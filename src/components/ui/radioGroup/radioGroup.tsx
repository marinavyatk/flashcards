import { ComponentPropsWithoutRef, forwardRef } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

type radioItem = {
  checked: boolean
  disabled: boolean
  label: string
  value: string
}
type RadioGroupComponentProps = {
  className?: string
  onChange?: () => void
  radioItems?: radioItem[]
} & ComponentPropsWithoutRef<'button'>
export const RadioGroupComponent = forwardRef<HTMLButtonElement, RadioGroupComponentProps>(
  (props: RadioGroupComponentProps, ref) => {
    const { className, onChange, radioItems = [], ...rest } = props

    return (
      <RadioGroup.Root
        className={`${s.radioRoot} ${className && className} `}
        onValueChange={onChange}
      >
        {radioItems.length &&
          radioItems.map(item => {
            return (
              <div className={`${s.radioItem} ${item.disabled ? s.disabled : ''}`} key={item.value}>
                <div className={s.radioButton}>
                  <RadioGroup.Item
                    className={s.radioSign}
                    disabled={item.disabled}
                    ref={ref}
                    value={item.value}
                  >
                    <RadioGroup.Indicator className={s.radioIndicator} />
                  </RadioGroup.Item>
                </div>
                <label className={s.radioLabel}>{item.label}</label>
              </div>
            )
          })}
      </RadioGroup.Root>
    )
  }
)
