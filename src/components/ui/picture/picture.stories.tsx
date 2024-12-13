import type { Meta, StoryObj } from '@storybook/react'

import { Picture } from './'

const meta = {
  component: Picture,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Picture',
} satisfies Meta<typeof Picture>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    alt: 'Кот',
    containerProps: {
      style: {
        height: '300px',
        width: '300px',
      },
    },
    src: 'https://proza.ru/pics/2021/07/16/912.jpg',
  },
}
