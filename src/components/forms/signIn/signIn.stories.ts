import type { Meta, StoryObj } from '@storybook/react'

import { SignInFormValues } from '@/common/formValidation'

import { SingIn } from './'

const meta = {
  component: SingIn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Forms/SingIn',
} satisfies Meta<typeof SingIn>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onFormSubmit: (data: SignInFormValues) => {
      console.log(data)
    },
  },
}
