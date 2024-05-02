import { forwardRef } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'
import { RadioGroupItemProps, RadioGroupProps } from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './radioGroup.module.scss'

type radioItem = {
  label: string
  restProps: RadioGroupItemProps
}
type RadioGroupComponentProps = {
  radioItems: radioItem[]
} & RadioGroupProps
export const RadioGroupComponent = forwardRef<HTMLButtonElement, RadioGroupComponentProps>(
  (props: RadioGroupComponentProps, ref) => {
    const { className, onChange, radioItems = [], ...rest } = props
    const classNames = clsx(s.radioRoot, className)

    const radioGroupItems = radioItems.map(item => {
      return (
        <div
          className={clsx(s.radioItem, item.restProps?.disabled && s.disabled)}
          key={item.restProps?.value}
        >
          <div className={s.radioButton}>
            <RadioGroup.Item
              className={s.radioSign}
              ref={ref}
              {...item.restProps}
              id={item.restProps.value}
            >
              <RadioGroup.Indicator className={s.radioIndicator} />
            </RadioGroup.Item>
          </div>
          <label className={s.radioLabel} htmlFor={item.restProps.value}>
            {item.label}
          </label>
        </div>
      )
    })

    return (
      <RadioGroup.Root className={classNames} {...rest}>
        {radioGroupItems}
      </RadioGroup.Root>
    )
  }
)
