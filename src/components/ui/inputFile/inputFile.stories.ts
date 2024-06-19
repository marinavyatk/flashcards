import type { Meta, StoryObj } from '@storybook/react'

import { InputFile } from '@/components/ui/inputFile/inputFile'

const meta = {
  component: InputFile,
  tags: ['autodocs'],
  title: 'Components/InputFile',
} satisfies Meta<typeof InputFile>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
