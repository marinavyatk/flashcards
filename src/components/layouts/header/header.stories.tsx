import type { Meta, StoryObj } from '@storybook/react'

import Avatar from '@/assets/svg/dropdownMenu/avatar.png'
import { Header } from '@/components/layouts/header/header'

const meta = {
  component: Header,
  tags: ['autodocs'],
  title: 'Layouts/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderUnauthorized: Story = {
  args: {
    isAuthorized: false,
  },
}

export const HeaderAuthorized: Story = {
  args: {
    isAuthorized: true,
    userDropdownProps: { avatar: Avatar, email: 'ivan@mail.ru', name: 'Ivan' },
  },
}
