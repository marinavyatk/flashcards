import type { Meta, StoryObj } from '@storybook/react'

import { ConfirmEmail } from './'

const meta = {
  component: ConfirmEmail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Forms/ConfirmEmail',
} satisfies Meta<typeof ConfirmEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
