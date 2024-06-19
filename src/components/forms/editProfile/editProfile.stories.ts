import type { Meta, StoryObj } from '@storybook/react'

import { EditProfile } from '@/components/forms/editProfile/editProfile'
import { UpdateUserData } from '@/services/auth/authApiTypes'

const meta = {
  component: EditProfile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Forms/EditProfile',
} satisfies Meta<typeof EditProfile>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    email: '1234@mail.ru',
    name: 'Ivan',
    onFormSubmit: (data: UpdateUserData) => {
      console.log(data)
    },
    onSignOut: () => {},
  },
}
