import type { Meta, StoryObj } from '@storybook/react'

import { EditProfile } from '@/components/forms/editProfile/editProfile'
import { EditProfileFormValues } from '@/components/forms/formValidation'

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
    onFormSubmit: (data: EditProfileFormValues) => {
      console.log(data)
    },
  },
}
