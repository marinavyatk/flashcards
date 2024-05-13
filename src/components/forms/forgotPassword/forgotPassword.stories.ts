import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPassword, FormValues } from './'

const meta = {
  component: ForgotPassword,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Forms/ForgotPassword',
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onFormSubmit: (data: FormValues) => {
      console.log(data)
    },
  },
}
