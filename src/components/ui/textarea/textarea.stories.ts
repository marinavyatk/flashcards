import type { Meta, StoryObj } from '@storybook/react'

import { TextArea } from '@/components/ui/textarea/textarea'

const meta = {
  argTypes: {
    disabled: {
      control: { type: 'radio' },
      options: [true, false],
    },
    errorMessage: {
      control: { type: 'radio' },
      options: ['Something wrong', undefined],
    },
  },
  component: TextArea,
  tags: ['autodocs'],
  title: 'Components/TextArea',
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    disabled: false,
    placeholder: 'primary textarea',
  },
}
export const PrimaryDisabled: Story = {
  args: {
    disabled: true,
    placeholder: 'primary textarea disabled',
  },
}
