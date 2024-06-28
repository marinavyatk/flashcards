import type { Meta, StoryObj } from '@storybook/react'

import { SettingDropdown } from '@/components/ui/dropdownMenu/settingDropdown/settingDropdown'

const meta = {
  component: SettingDropdown,
  tags: ['autodocs'],
  title: 'Components/DropdownMenu/Settings',
} satisfies Meta<typeof SettingDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownMenuWithSettings: Story = {
  args: {
    deletedElement: 'Card',
    id: '1234',
    onConfirmDelete: (id: string) => {
      console.log(id)
    },
  },
}
