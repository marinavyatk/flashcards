import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroupComponent } from './'

const meta = {
  argTypes: {},
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
        label: 'First item',
        restProps: {
          disabled: false,
          value: 'First item',
        },
      },
      {
        label: 'Second item',
        restProps: {
          disabled: false,
          value: 'Second item',
        },
      },

      {
        label: 'Third item',
        restProps: {
          disabled: false,
          value: 'Third item',
        },
      },
    ],
  },
}

export const RadioGroupDisabled: Story = {
  args: {
    radioItems: [
      {
        label: 'Disabled item1',
        restProps: {
          disabled: true,
          value: 'First item',
        },
      },
      {
        label: 'Disabled item2',
        restProps: {
          disabled: true,
          value: 'Second item',
        },
      },
      {
        label: 'Disabled item3',
        restProps: {
          disabled: true,
          value: 'Third item',
        },
      },
    ],
  },
}
