import { ComponentPropsWithoutRef } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuProps,
} from '@radix-ui/react-dropdown-menu'

import s from './dropdownMenu.module.scss'

type menuItem = {
  icon: string
  onClick?: () => void
  title: string
}
export type DropdownMenuComponentProps = {
  contentProps: DropdownMenuContentProps
  itemProps: DropdownMenuItemProps
  menuItems: menuItem[]
  rootProps?: DropdownMenuProps
  triggerImage: string
  userInfo?: {
    email: string
    name: string
  }
  variant: 'settings' | 'userInfo'
} & ComponentPropsWithoutRef<'div'>
export const DropdownMenuComponent = (props: DropdownMenuComponentProps) => {
  const {
    className,
    contentProps,
    itemProps,
    menuItems,
    rootProps,
    triggerImage,
    userInfo,
    variant,
    ...restProps
  } = props
  const menuItemsSections = menuItems.map((item, index, array) => {
    if (index !== array.length - 1) {
      return (
        <>
          <DropdownMenu.Item
            className={s.dropdownMenuItem}
            key={item.title}
            onClick={item.onClick}
            {...itemProps}
          >
            <img alt={'Dropdown item'} src={item.icon} />
            {item.title}
          </DropdownMenu.Item>
          <DropdownMenu.Separator className={s.dropdownMenuSeparator} />
        </>
      )
    }

    return (
      <>
        <DropdownMenu.Item className={s.dropdownMenuItem} {...itemProps}>
          <img alt={'Dropdown item'} src={item.icon} />
          {item.title}
        </DropdownMenu.Item>
      </>
    )
  })

  return (
    <div className={className} {...restProps}>
      <DropdownMenu.Root {...rootProps} modal={false}>
        <DropdownMenu.Trigger
          asChild
          className={variant === 'userInfo' ? s.avatar : s.dropdownMenuTrigger}
        >
          <img alt={'Dropdown trigger'} src={triggerImage} />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align={'end'}
            alignOffset={variant === 'userInfo' ? 0 : -2}
            className={s.dropdownMenuContent}
            sideOffset={9}
            {...contentProps}
          >
            <div className={s.angle}></div>
            {variant === 'userInfo' && userInfo && (
              <>
                <DropdownMenu.Item className={s.dropdownMenuItem} {...itemProps}>
                  <div className={s.userSection}>
                    <img alt={'Dropdown item'} className={s.avatar} src={triggerImage} />
                    <div className={s.userInfo}>
                      <p className={s.userName}>{userInfo.name}</p>
                      <p className={s.userEmail}>{userInfo.email}</p>
                    </div>
                  </div>
                </DropdownMenu.Item>
                <DropdownMenu.Separator className={s.dropdownMenuSeparator} />
              </>
            )}
            {menuItemsSections}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
