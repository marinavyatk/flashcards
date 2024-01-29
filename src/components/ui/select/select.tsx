import { ComponentPropsWithoutRef, LegacyRef, forwardRef, useState } from 'react'

import { ArrowDown } from '@/utils/images/ArrowDown'
// import * as Select from '@radix-ui/react-select'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuProps,
} from '@radix-ui/react-dropdown-menu'

import s from './select.module.scss'

export type SelectComponentProps = {
  contentProps?: DropdownMenuContentProps
  disabled?: boolean
  itemProps: DropdownMenuItemProps[]
  rootProps?: DropdownMenuProps
  triggerTitle: string
} & ComponentPropsWithoutRef<'div'>
export const SelectComponent = forwardRef(
  (
    {
      contentProps,
      disabled = false,
      itemProps,
      rootProps,
      triggerTitle,
      ...restProps
    }: SelectComponentProps,
    ref: LegacyRef<HTMLSpanElement> | undefined
  ) => {
    const [selectedValue, setSelectedValue] = useState(triggerTitle)
    const items = itemProps.map((item, index) => {
      return (
        <DropdownMenu.Item
          {...itemProps[index]}
          className={s.selectItem}
          key={item.textValue}
          onClick={() => setSelectedValue(item.textValue ? item.textValue : '')}
        >
          {item.textValue}
        </DropdownMenu.Item>
      )
    })

    return (
      <div {...restProps} className={`restProps.className ${disabled ? s.disabled : ''}`}>
        <DropdownMenu.Root {...rootProps} modal={false}>
          <DropdownMenu.Trigger className={s.selectTrigger}>
            <span ref={ref}>{selectedValue}</span>
            <ArrowDown className={s.selectArrow} />
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              {...contentProps}
              align={'center'}
              avoidCollisions={false}
              className={s.selectContent}
            >
              {items}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    )
  }
)
