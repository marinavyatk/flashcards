import type { Meta, StoryObj } from '@storybook/react'

import { Modal } from '@/components/ui/modal/modal'

const meta = {
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'sdeklf jsvvrtgsr vg rjtgn vskrntgjnsrv krtjgrnv',
    modalHeader: 'Edit profile',
    trigger: <button>Open modal</button>,
  },
}
