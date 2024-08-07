import type { Meta, StoryObj } from '@storybook/react'

import ImageIcon from '@/assets/svg/imageIcon.svg?react'
import { InputFileCover } from '@/components/ui/inputFile/inputFileCover/inputFileCover'

const meta = {
  component: InputFileCover,
  tags: ['autodocs'],
  title: 'Components/InputFileCover',
} satisfies Meta<typeof InputFileCover>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: (
      <>
        <ImageIcon /> Upload Image
      </>
    ),
  },
}
