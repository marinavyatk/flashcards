import type { Meta, StoryObj } from '@storybook/react'

import { AddNewCardModal } from '@/components/layouts/modals/addNewCardModal/addNewCardModal'

const meta = {
  component: AddNewCardModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Layouts/AddNewCardModal',
} satisfies Meta<typeof AddNewCardModal>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onFormSubmit: ({ answer, question }) => {
      console.log(answer, question)
    },
  },
}
