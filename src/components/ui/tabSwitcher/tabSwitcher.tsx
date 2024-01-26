import { ComponentPropsWithoutRef, useState } from 'react'

import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { ToggleGroupItemProps, ToggleGroupSingleProps } from '@radix-ui/react-toggle-group'

import s from './tabSwitcher.module.scss'

export type TabSwitcherProps = {
  itemProps: ToggleGroupItemProps[]
  rootProps?: ToggleGroupSingleProps
} & ComponentPropsWithoutRef<'div'>
export const TabSwitcher = ({
  className,
  itemProps,
  rootProps,
  ...restProps
}: TabSwitcherProps) => {
  const [value, setValue] = useState(rootProps?.defaultValue || '')
  const items = itemProps?.map((switcher, index) => {
    return (
      <ToggleGroup.Item
        {...itemProps?.[index]}
        className={s.toggleItem}
        key={switcher.value}
        value={switcher.value}
      >
        {switcher.value}
      </ToggleGroup.Item>
    )
  })

  return (
    <div {...restProps} className={className}>
      <ToggleGroup.Root
        {...rootProps}
        className={s.toggleRoot + ' ' + rootProps?.className}
        onValueChange={value => {
          if (value) {
            setValue(value)
          }
        }}
        type={'single'}
        value={value}
      >
        {items}
      </ToggleGroup.Root>
    </div>
  )
}
