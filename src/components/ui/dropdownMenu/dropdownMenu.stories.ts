import type { Meta, StoryObj } from '@storybook/react'

import avatar from '@/utils/images/dropdownMenu/avatar.png'
import out from '@/utils/images/dropdownMenu/outIcon.svg'
import user from '@/utils/images/dropdownMenu/userIcon.svg'

import deleteIcon from '../../../utils/images/dropdownMenu/deleteIcon.svg'
import triggerIcon from '../../../utils/images/dropdownMenu/dropDownIcon.png'
import editIcon from '../../../utils/images/dropdownMenu/editIcon.svg'
import playIcon from '../../../utils/images/dropdownMenu/playIcon.svg'
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
    onClick: () => {},
    title: 'My profile',
  },
  {
    icon: out,
    onClick: () => {},
    title: 'Sign out',
  },
]

const menuItemsForSettings = [
  {
    icon: playIcon,
    onClick: () => {},
    title: 'Learn',
  },
  {
    icon: editIcon,
    onClick: () => {},
    title: 'Edit',
  },
  {
    icon: deleteIcon,
    onClick: () => {},
    title: 'Delete',
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
