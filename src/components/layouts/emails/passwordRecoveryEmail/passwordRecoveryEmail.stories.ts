import type { Meta, StoryObj } from '@storybook/react'

import { PasswordRecoveryEmail } from '@/components/layouts/emails/passwordRecoveryEmail/passwordRecoveryEmail'

const meta = {
  component: PasswordRecoveryEmail,
  tags: ['autodocs'],
  title: 'Layouts/PasswordRecoveryEmail',
} satisfies Meta<typeof PasswordRecoveryEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    userName: 'USER007',
  },
}
