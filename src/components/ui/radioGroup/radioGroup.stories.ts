import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroupComponent } from './'

const meta = {
  argTypes: {
    radioItems: {
      control: { type: 'radio' },
      // options: ['primary', 'secondary', 'tertiary', 'link'],
    },
  },
  component: RadioGroupComponent,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroupComponent>

export default meta
type Story = StoryObj<typeof meta>

export const RadioGroup: Story = {
  args: {
    radioItems: [
      {
        checked: false,
        disabled: false,
        label: 'First item',
        value: 'First item',
      },
      {
        checked: false,
        disabled: false,
        label: 'Second item',
        value: 'Second item',
      },
      {
        checked: false,
        disabled: false,
        label: 'Third item',
        value: 'Third item',
      },
    ],
  },
}

export const RadioGroupDisabled: Story = {
  args: {
    radioItems: [
      {
        checked: false,
        disabled: true,
        label: 'Disabled item1',
        value: 'First item',
      },
      {
        checked: false,
        disabled: true,
        label: 'Disabled item2',
        value: 'Second item',
      },
      {
        checked: false,
        disabled: true,
        label: 'Disabled item3',
        value: 'Third item',
      },
    ],
  },
}
