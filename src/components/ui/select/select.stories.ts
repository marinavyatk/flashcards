import type { Meta, StoryObj } from '@storybook/react'

import { SelectComponent } from './'

const meta = {
  component: SelectComponent,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof SelectComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Select: Story = {
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
