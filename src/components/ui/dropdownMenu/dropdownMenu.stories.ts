import type { Meta, StoryObj } from '@storybook/react'

import avatar from '@/assets/svg/dropdownMenu/avatar.png'
import deleteIcon from '@/assets/svg/dropdownMenu/deleteIcon.svg'
import triggerIcon from '@/assets/svg/dropdownMenu/dropDownIcon.png'
import editIcon from '@/assets/svg/dropdownMenu/editIcon.svg'
import out from '@/assets/svg/dropdownMenu/outIcon.svg'
import playIcon from '@/assets/svg/dropdownMenu/playIcon.svg'
import user from '@/assets/svg/dropdownMenu/userIcon.svg'

import { DropdownMenuComponent } from './'

const meta = {
  component: DropdownMenuComponent,
  tags: ['autodocs'],
  title: 'Components/DropdownMenu',
} satisfies Meta<typeof DropdownMenuComponent>

export default meta
type Story = StoryObj<typeof meta>

const userInfo = {
  email: 'j&johnson@gmail.com',
  name: 'Ivan',
}
const menuItemsForUser = [
  {
    icon: user,
    menuItemText: 'My profile',
  },
  {
    icon: out,
    menuItemText: 'Sign out',
  },
]

const menuItemsForSettings = [
  {
    icon: playIcon,
    menuItemText: 'Learn',
  },
  {
    icon: editIcon,
    menuItemText: 'Edit',
  },
  {
    icon: deleteIcon,
    menuItemText: 'Delete',
  },
]

export const DropdownMenuComponentWithUserInfo: Story = {
  args: {
    menuItems: menuItemsForUser,
    triggerImage: avatar,
    userInfo: userInfo,
    variant: 'userInfo',
  },
}
export const DropdownMenuComponentWithSettings: Story = {
  args: {
    menuItems: menuItemsForSettings,
    triggerImage: triggerIcon,
    variant: 'settings',
  },
}
