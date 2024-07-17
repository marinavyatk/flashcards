import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from './'

const meta = {
  argTypes: {
    disabled: {
      control: { type: 'radio' },
      options: [true, false],
    },
    errorMessage: {
      control: { type: 'radio' },
      options: ['Something wrong', undefined],
    },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'password', 'search'],
    },
  },
  component: TextField,
  tags: ['autodocs'],
  title: 'Components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    disabled: false,
    placeholder: 'primary input',
  },
}
export const PrimaryDisabled: Story = {
  args: {
    disabled: true,
    placeholder: 'primary input disabled',
  },
}
export const Password: Story = {
  args: {
    disabled: false,
    placeholder: 'password input',
    type: 'password',
  },
}
export const PasswordDisabled: Story = {
  args: {
    disabled: true,
    placeholder: 'password input disabled',
    type: 'password',
  },
}
export const Search: Story = {
  args: {
    disabled: false,
    placeholder: 'primary input',
    type: 'search',
  },
}
export const SearchDisabled: Story = {
  args: {
    disabled: true,
    placeholder: 'primary input disabled',
    type: 'search',
  },
}
