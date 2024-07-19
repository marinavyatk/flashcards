import type { Meta, StoryObj } from '@storybook/react'

import { NewAccountEmail } from '@/components/layouts/emails/newAccountEmail/newAccountEmail'

const meta = {
  component: NewAccountEmail,
  tags: ['autodocs'],
  title: 'Layouts/NewAccountEmail',
} satisfies Meta<typeof NewAccountEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    userName: 'USER007',
  },
}
