import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    itemProps: [{ value: 'First option' }, { value: 'Second option' }],
    triggerValue: { placeholder: 'Choose option' },
  },
}
export const SelectDisabled: Story = {
  args: {
    itemProps: [{ value: 'First option' }, { value: 'Second option' }],
    rootProps: { disabled: true },
    triggerValue: { placeholder: 'Choose option' },
  },
}
export const SelectWithFewElements: Story = {
  args: {
    itemProps: [
      { value: 'First option' },
      { value: 'Second option' },
      { value: 'Third option' },
      { value: 'Fourth option' },
      { value: 'Fifth option' },
      { value: 'Sixth option' },
      { value: 'Seventh option' },
      { value: 'Eighth option' },
      { value: 'Ninth option' },
      { value: 'Tenth option' },
    ],
    triggerValue: { placeholder: 'Choose option' },
  },
}
