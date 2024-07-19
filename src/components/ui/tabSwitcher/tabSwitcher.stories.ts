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
    itemProps: [
      { itemName: 'My cards', value: 'my-cards' },
      { itemName: 'All cards', value: 'all-cards' },
    ],
  },
}
export const TabSwitcherDisabled: Story = {
  args: {
    itemProps: [
      { disabled: true, itemName: 'my-cards', value: 'My cards' },
      { disabled: false, itemName: 'all-cards', value: 'All cards' },
    ],
  },
}
export const TabSwitcherWithFewValues: Story = {
  args: {
    defaultValue: 'Her cards',
    itemProps: [
      { itemName: 'My cards', value: 'my-cards' },
      { itemName: 'Her cards', value: 'her-cards' },
      { itemName: 'His cards', value: 'his-cards' },
      { itemName: 'Its cards', value: 'its-cards' },
      { itemName: 'All cards', value: 'all-cards' },
    ],
  },
}
