import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './'

const meta = {
  title: 'Auth/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
