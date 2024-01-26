import type { Meta, StoryObj } from '@storybook/react'

import { CreateNewPassword } from '@/components/auth/createNewPassword/createNewPassword'

const meta = {
  component: CreateNewPassword,
  tags: ['autodocs'],
  title: 'Auth/CreateNewPassword',
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}