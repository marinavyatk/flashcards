import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { DropdownMenuContentProps, DropdownMenuProps } from '@radix-ui/react-dropdown-menu'

import s from './dropdownMenu.module.scss'

export type DropdownMenuComponentProps = {
  contentProps?: DropdownMenuContentProps
  rootProps?: DropdownMenuProps
  trigger: ReactNode
} & ComponentPropsWithoutRef<'div'>

export const DropdownMenuComponent = (props: DropdownMenuComponentProps) => {
  const { children, className, contentProps, rootProps, trigger, ...restProps } = props

  //div need to pass className to component (DropdownMenu.Root don`t have className props)
  return (
    <div className={className} {...restProps}>
      <DropdownMenu.Root {...rootProps} modal={false}>
        <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align={'end'}
            className={s.dropdownMenuContent}
            sideOffset={12}
            {...contentProps}
          >
            <div className={s.angle}></div>
            {children}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
