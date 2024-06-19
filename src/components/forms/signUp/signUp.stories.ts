import type { Meta, StoryObj } from '@storybook/react'

import { SignUpFormValues } from '@/components/forms/formValidation'

import { SingUp } from './'

const meta = {
  component: SingUp,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Forms/SingUp',
} satisfies Meta<typeof SingUp>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onFormSubmit: (data: SignUpFormValues) => {
      console.log(data)
    },
  },
}
