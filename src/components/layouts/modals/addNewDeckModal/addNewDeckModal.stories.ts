import type { Meta, StoryObj } from '@storybook/react'

import { AddNewDeckModal } from '@/components/layouts/modals/addNewDeckModal/addNewDeckModal'

const meta = {
  component: AddNewDeckModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Layouts/AddNewDeckModal',
} satisfies Meta<typeof AddNewDeckModal>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
