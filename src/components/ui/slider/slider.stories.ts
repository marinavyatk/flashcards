import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from './'

const meta = {
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    rootProps: {
      defaultValue: [1, 9],
      max: 10,
    },
  },
}
