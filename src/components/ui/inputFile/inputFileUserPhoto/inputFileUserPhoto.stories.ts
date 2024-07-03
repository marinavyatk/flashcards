import type { Meta, StoryObj } from '@storybook/react'

import { InputFileUserPhoto } from '@/components/ui/inputFile/inputFileUserPhoto/inputFileUserPhoto'

const meta = {
  component: InputFileUserPhoto,
  tags: ['autodocs'],
  title: 'Components/InputFileUserPhoto',
} satisfies Meta<typeof InputFileUserPhoto>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
