import type { Meta, StoryObj } from '@storybook/react'

import { CheckboxInput } from './'

const meta = {
  component: CheckboxInput,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof CheckboxInput>

export default meta
type Story = StoryObj<typeof meta>

export const CheckboxUnchecked: Story = {
  args: {
    checked: false,
    disabled: false,
    label: 'Checkbox',
  },
}
export const CheckboxUncheckedDisabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Checkbox',
  },
}

export const CheckboxChecked: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Checkbox',
  },
}
export const CheckboxCheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Checkbox',
  },
}

export const CheckboxCheckedUncontrolled: Story = {
  args: {
    label: 'Checkbox',
  },
}
