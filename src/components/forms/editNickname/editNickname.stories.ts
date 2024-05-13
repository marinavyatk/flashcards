import type { Meta, StoryObj } from '@storybook/react'

import { EditNickname, FormValues } from '@/components/forms/editNickname/editNickname'

const meta = {
  component: EditNickname,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Forms/EditNickname',
} satisfies Meta<typeof EditNickname>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onFormSubmit: (data: FormValues) => {
      console.log(data)
    },
  },
}
