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
    itemProps: [{ textValue: 'First option' }, { textValue: 'Second option' }],
    triggerTitle: 'Choose option',
  },
}
export const SelectDisabled: Story = {
  args: {
    disabled: true,
    itemProps: [{ textValue: 'First option' }, { textValue: 'Second option' }],
    triggerTitle: 'Choose option',
  },
}
export const SelectWithFewElements: Story = {
  args: {
    itemProps: [
      { textValue: 'First option' },
      { textValue: 'Second option' },
      { textValue: 'Third option' },
      { textValue: 'Fourth option' },
      { textValue: 'Fifth option' },
      { textValue: 'Sixth option' },
      { textValue: 'Seventh option' },
      { textValue: 'Eighth option' },
      { textValue: 'Ninth option' },
      { textValue: 'Tenth option' },
    ],
    triggerTitle: 'Choose option',
  },
}
