import type { Meta, StoryObj } from '@storybook/react'

import { Rating } from '@/components/ui/rating/rating'

const meta = {
  argTypes: {
    grade: {
      control: { type: 'radio' },
      options: [0, 1, 2, 3, 4, 5],
    },
  },
  component: Rating,
  tags: ['autodocs'],
  title: 'Components/Rating',
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof meta>

export const Rating0: Story = {
  args: {
    cardId: '',
    grade: 0,
  },
}
export const Rating3: Story = {
  args: {
    cardId: '',
    grade: 3,
  },
}
export const Rating5: Story = {
  args: {
    cardId: '',
    grade: 5,
  },
}
