import type { Meta, StoryObj } from '@storybook/react'

import { ConfirmDeleteModal } from '@/components/layouts/modals/confirmDeleteModal/confirmDeleteModal'

const meta = {
  component: ConfirmDeleteModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Layouts/ConfirmDeleteModal',
} satisfies Meta<typeof ConfirmDeleteModal>

export default meta
type Story = StoryObj<typeof meta>

export const DeleteCard: Story = {
  args: {
    deletedElement: 'Card',
    onConfirm: () => {},
  },
}

export const DeleteDeck: Story = {
  args: {
    deletedElement: 'Deck',
    elementName: 'My Deck',
    onConfirm: () => {},
  },
}
