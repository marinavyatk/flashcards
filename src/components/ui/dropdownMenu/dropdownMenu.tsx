import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as RadixDropdown from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuProps as DropdownMenuRootProps,
} from '@radix-ui/react-dropdown-menu'

import s from './dropdownMenu.module.scss'

export type DropdownMenuProps = {
  contentProps?: DropdownMenuContentProps
  rootProps?: DropdownMenuRootProps
  trigger: ReactNode
} & ComponentPropsWithoutRef<'div'>

export const DropdownMenu = (props: DropdownMenuProps) => {
  const { children, className, contentProps, rootProps, trigger, ...restProps } = props

  //div need to pass className to component (DropdownMenu.Root don`t have className props)
  return (
    <div className={className} {...restProps}>
      <RadixDropdown.Root {...rootProps} modal={false}>
        <RadixDropdown.Trigger asChild tabIndex={0}>
          {trigger}
        </RadixDropdown.Trigger>
        <RadixDropdown.Portal>
          <RadixDropdown.Content
            align={'end'}
            className={s.dropdownMenuContent}
            sideOffset={12}
            {...contentProps}
          >
            <div className={s.angle}></div>
            {children}
          </RadixDropdown.Content>
        </RadixDropdown.Portal>
      </RadixDropdown.Root>
    </div>
  )
}

export type DropdownItemProps = DropdownMenuItemProps

export const DropdownItem = (props: DropdownItemProps) => {
  return <RadixDropdown.Item {...props} className={props.className} />
}

export const DropdownSeparator = () => {
  return <RadixDropdown.Separator className={s.separator} />
}
