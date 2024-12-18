import type { Meta, StoryObj } from '@storybook/react'

import { ConfirmDeleteAccountModal } from '@/components/layouts/modals/confirnDeleteAccountModal/confirnDeleteAccountModal'

const meta = {
  component: ConfirmDeleteAccountModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Layouts/ConfirmDeleteAccountModal',
} satisfies Meta<typeof ConfirmDeleteAccountModal>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onConfirm: () => {},
  },
}
