import type { Meta, StoryObj } from '@storybook/react'

import { SliderComponent } from './'

const meta = {
  component: SliderComponent,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof SliderComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Slider: Story = {
  args: {
    rootProps: {
      defaultValue: [1, 9],
      max: 10,
    },
  },
}
