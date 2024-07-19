import type { Meta, StoryObj } from '@storybook/react'

import { BackLink } from '@/components/layouts/backLink/backLink'

const meta = {
  component: BackLink,
  tags: ['autodocs'],
  title: 'Layouts/BackLink',
} satisfies Meta<typeof BackLink>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Back to Deck List',
    to: '..',
  },
}
