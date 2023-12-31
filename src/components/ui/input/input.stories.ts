import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './input'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'link'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Input',
    disabled: true,
    placeholder: 'Input',
    errorMessage: 'errorMessage',
  },
}
export const Secondary: Story = {
  args: {
    variant: 'primary',
    children: 'Secondary Input',
    disabled: false,
    icon: 'passwordControl',
    placeholder: 'Input',
    text: 'textInput',
    errorMessage: 'errorMessage',
  },
}

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Input',
    disabled: false,
    loupe: 'loupeSearch',
    cross: 'crossDelete',
    placeholder: 'Input search',
    text: 'textInput',
    errorMessage: 'errorMessage',
  },
}
