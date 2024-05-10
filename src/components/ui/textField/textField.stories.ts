import type { Meta, StoryObj } from '@storybook/react'

import TextareaAutosize from 'react-textarea-autosize'

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
    variant: 'primary',
  },
}
export const PrimaryDisabled: Story = {
  args: {
    disabled: true,
    placeholder: 'primary input disabled',
    variant: 'primary',
  },
}
export const Password: Story = {
  args: {
    disabled: false,
    placeholder: 'password input',
    variant: 'password',
  },
}
export const PasswordDisabled: Story = {
  args: {
    disabled: true,
    placeholder: 'password input disabled',
    variant: 'password',
  },
}
export const Search: Story = {
  args: {
    disabled: false,
    placeholder: 'primary input',
    variant: 'search',
  },
}
export const SearchDisabled: Story = {
  args: {
    disabled: true,
    placeholder: 'primary input disabled',
    variant: 'search',
  },
}
export const Textarea: Story = {
  args: {
    as: TextareaAutosize,
    disabled: false,
    placeholder: 'primary input',
    variant: 'primary',
  },
}
