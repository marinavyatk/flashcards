import { ComponentPropsWithoutRef } from 'react'

import ArrowDown from '@/assets/svg/arrowDown.svg?react'
import * as Select from '@radix-ui/react-select'
import {
  SelectContentProps,
  SelectItemProps,
  SelectProps,
  SelectValueProps,
} from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

export type SelectComponentProps = {
  contentProps?: SelectContentProps
  itemProps: SelectItemProps[]
  rootProps?: SelectProps
  triggerValue: SelectValueProps
} & ComponentPropsWithoutRef<'div'>
export const SelectComponent = ({
  className,
  contentProps,
  itemProps,
  rootProps,
  triggerValue,
  ...restProps
}: SelectComponentProps) => {
  const classNames = clsx(s.selectContainer, className)
  const items = itemProps.map((item, index) => {
    return (
      <Select.Item {...itemProps[index]} className={s.selectItem} key={item.value}>
        <Select.ItemText>{item.value}</Select.ItemText>
      </Select.Item>
    )
  })

  return (
    <div {...restProps} className={classNames}>
      <Select.Root {...rootProps}>
        <Select.Trigger className={s.selectTrigger}>
          <Select.Value {...triggerValue} className={s.selectValue} />
          <Select.Icon asChild className={s.selectIcon}>
            <ArrowDown className={s.selectArrow} />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content {...contentProps} className={s.selectContent} position={'popper'}>
            <Select.Viewport>
              <Select.Group>{items}</Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
