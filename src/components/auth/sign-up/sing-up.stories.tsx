import type { Meta, StoryObj } from '@storybook/react'

import { SingUp } from './sing-up'

const meta = {
  title: 'Auth/Sing Up',
  component: SingUp,
  tags: ['autodocs'],
} satisfies Meta<typeof SingUp>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
