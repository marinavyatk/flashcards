import type { Meta, StoryObj } from '@storybook/react'

import { Notification } from './'

const meta = {
  component: Notification,
  tags: ['autodocs'],
  title: 'Components/Notification',
} satisfies Meta<typeof Notification>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    description: 'Sorry, something goes wrong ',
    rootProps: { open: true },
  },
}
