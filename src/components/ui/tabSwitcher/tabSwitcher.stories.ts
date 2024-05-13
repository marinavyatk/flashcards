import type { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher } from './'

const meta = {
  component: TabSwitcher,
  tags: ['autodocs'],
  title: 'Components/TabSwitcher',
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const TabSwitcherWithTwoItems: Story = {
  args: {
    itemProps: [{ value: 'My cards' }, { value: 'All cards' }],
    type: 'single',
  },
}
export const TabSwitcherDisabled: Story = {
  args: {
    itemProps: [
      { disabled: true, value: 'My cards' },
      { disabled: false, value: 'All cards' },
    ],
    type: 'single',
  },
}
export const TabSwitcherWithFewValues: Story = {
  args: {
    defaultValue: 'Her cards',
    itemProps: [
      { value: 'My cards' },
      { value: 'Her cards' },
      { value: 'His cards' },
      { value: 'Its cards' },
      { value: 'All cards' },
    ],
    type: 'single',
  },
}
