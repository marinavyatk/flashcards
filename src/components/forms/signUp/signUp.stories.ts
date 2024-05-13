import type { Meta, StoryObj } from '@storybook/react'

import { FormValues, SingUp } from './'

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
    onFormSubmit: (data: FormValues) => {
      console.log(data)
    },
  },
}
