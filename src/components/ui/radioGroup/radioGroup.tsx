import { forwardRef, useId } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'
import { RadioGroupItemProps, RadioGroupProps } from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './radioGroup.module.scss'

type radioItem = {
  label: string
  restProps: RadioGroupItemProps
}
export type RadioGroupComponentProps = {
  radioItems: radioItem[]
} & RadioGroupProps
export const RadioGroupComponent = forwardRef<HTMLButtonElement, RadioGroupComponentProps>(
  (props: RadioGroupComponentProps, ref) => {
    const { className, radioItems = [], ...restProps } = props
    const classNames = clsx(s.radioRoot, className)
    const generatedId = useId()
    const radioGroupItems = radioItems.map(item => {
      const finalId = generatedId + item.restProps.value

      return (
        <div
          className={clsx(s.radioItem, item.restProps?.disabled && s.disabled)}
          key={item.restProps?.value}
        >
          <div className={s.radioButton}>
            <RadioGroup.Item className={s.radioSign} ref={ref} {...item.restProps} id={finalId}>
              <RadioGroup.Indicator className={s.radioIndicator} />
            </RadioGroup.Item>
          </div>
          <label className={s.radioLabel} htmlFor={finalId}>
            {item.label}
          </label>
        </div>
      )
    })

    return (
      <RadioGroup.Root className={classNames} {...restProps}>
        {radioGroupItems}
      </RadioGroup.Root>
    )
  }
)
