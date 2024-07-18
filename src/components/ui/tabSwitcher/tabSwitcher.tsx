import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { ToggleGroupItemProps, ToggleGroupSingleProps } from '@radix-ui/react-toggle-group'
import clsx from 'clsx'

import s from './tabSwitcher.module.scss'

export type TabSwitcherProps = {
  itemProps: ({ itemName: string } & ToggleGroupItemProps)[]
} & Omit<ToggleGroupSingleProps, 'type'>

export const TabSwitcher = ({ className, itemProps, ...restProps }: TabSwitcherProps) => {
  const items = itemProps?.map(toggleItem => {
    const { itemName, ...restProps } = toggleItem

    return (
      <ToggleGroup.Item className={s.toggleItem} key={toggleItem.value} {...restProps}>
        {itemName}
      </ToggleGroup.Item>
    )
  })
  const classNames = clsx(s.toggleRoot, className)

  return (
    <ToggleGroup.Root {...restProps} className={classNames} type={'single'}>
      {items}
    </ToggleGroup.Root>
  )
}
