import { ComponentPropsWithoutRef } from 'react'

import ArrowDown from '@/assets/svg/arrowDown.svg?react'
import * as RadixSelect from '@radix-ui/react-select'
import {
  SelectProps as RadixSelectProps,
  SelectContentProps,
  SelectItemProps,
  SelectValueProps,
} from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

export type SelectProps = {
  contentProps?: SelectContentProps
  itemProps: SelectItemProps[]
  rootProps?: RadixSelectProps
  triggerValue: SelectValueProps
} & ComponentPropsWithoutRef<'div'>

export const Select = ({
  className,
  contentProps,
  itemProps,
  rootProps,
  triggerValue,
  ...restProps
}: SelectProps) => {
  const classNames = clsx(s.selectContainer, className)
  const items = itemProps.map((item, index) => {
    return (
      <RadixSelect.Item {...itemProps[index]} className={s.selectItem} key={item.value}>
        <RadixSelect.ItemText>{item.value}</RadixSelect.ItemText>
      </RadixSelect.Item>
    )
  })

  return (
    <div {...restProps} className={classNames}>
      <RadixSelect.Root {...rootProps}>
        <RadixSelect.Trigger
          aria-label={'Change quantity items per page'}
          className={s.selectTrigger}
        >
          <RadixSelect.Value {...triggerValue} className={s.selectValue} />
          <RadixSelect.Icon asChild className={s.selectIcon}>
            <ArrowDown className={s.selectArrow} />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content {...contentProps} className={s.selectContent} position={'popper'}>
            <RadixSelect.Viewport>
              <RadixSelect.Group>{items}</RadixSelect.Group>
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  )
}
