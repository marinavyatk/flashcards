import type { Meta, StoryObj } from '@storybook/react'

import { useArgs } from '@storybook/preview-api'

import { CheckboxComponent } from './'

const meta = {
  component: CheckboxComponent,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof CheckboxComponent>

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

export const Example: Story = {
  args: {
    checked: true,
    label: 'Checkbox',
  },

  render: args => {
    const [{ isChecked }, updateArgs] = useArgs()

    function onChange() {
      updateArgs({ isChecked: !isChecked })
    }

    return <CheckboxComponent {...args} checked={isChecked} onCheckedChange={onChange} />
  },
}
