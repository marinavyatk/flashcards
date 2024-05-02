import type { Meta, StoryObj } from '@storybook/react'

import OutIcon from '@/assets/svg/icon-out.svg?react'

import { Button } from './'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
  },
}

export const PrimaryWithIcon: Story = {
  args: {
    disabled: false,
    variant: 'primary',
  },
  render: args => {
    return (
      <Button {...args}>
        <OutIcon /> Primary button with icon
      </Button>
    )
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    disabled: false,
    variant: 'secondary',
  },
}

export const Link: Story = {
  args: {
    as: 'a',
    children: 'Link Button',
    disabled: false,
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}
