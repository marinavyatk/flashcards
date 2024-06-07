import type { Meta, StoryObj } from '@storybook/react'

import Avatar from '@/assets/svg/dropdownMenu/avatar.png'
import { UserDropdown } from '@/components/ui/dropdownMenu/userDropdown/userDropdown'

const meta = {
  component: UserDropdown,
  tags: ['autodocs'],
  title: 'Components/DropdownMenu/UserDropDown',
} satisfies Meta<typeof UserDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownMenuWithSettings: Story = {
  args: {
    avatar: Avatar,
    email: 'j&johnson@gmail.com',
    name: 'Ivan',
  },
}
