import type { Meta, StoryObj } from '@storybook/react'

import { CreateNewPassword } from '@/components/forms/createNewPassword/createNewPassword'
import { CreateNewPasswordFormValues } from '@/components/forms/formValidation'

const meta = {
  component: CreateNewPassword,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Forms/CreateNewPassword',
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onFormSubmit: (data: CreateNewPasswordFormValues) => {
      console.log(data)
    },
  },
}
