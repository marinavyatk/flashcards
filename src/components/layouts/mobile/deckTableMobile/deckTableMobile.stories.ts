import type { Meta, StoryObj } from '@storybook/react'

import { DeckTableMobile } from '@/components/layouts/mobile/deckTableMobile/deckTableMobile'

const meta = {
  component: DeckTableMobile,
  tags: ['autodocs'],
  title: 'Layouts/DeckTableMobile',
} satisfies Meta<typeof DeckTableMobile>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onDeleteDeckTriggerClick: () => {},
    onEditDeckTriggerClick: () => {},
    onLearn: () => {},
    tableRowsData: [
      {
        author: { id: '1', name: 'Ivan' },
        cardsCount: 4,
        cover: '',
        created: '22.07.2024',
        id: '222',
        isPrivate: true,
        name: 'Common question',
        updated: '22.07.2024',
        userId: '1',
      },
    ],
    userId: '1',
  },
}
