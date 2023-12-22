import type { Meta, StoryObj } from '@storybook/react'
import { SingIn } from './'

const meta = {
  title: 'Auth/Sing In',
  component: SingIn,
  tags: ['autodocs'],
} satisfies Meta<typeof SingIn>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
