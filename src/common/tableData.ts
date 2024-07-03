import { Cell } from '@/components/layouts/appTable/cardsTableBody'

export const decksData: Cell[] = [
  {
    name: 'Deck name',
    orderBy: 'name',
  },
  {
    name: 'Cards',
    orderBy: 'cardsCount',
  },
  {
    name: 'Last Updated',
    orderBy: 'updated',
  },
  {
    name: 'Created by',
    orderBy: 'author.name',
  },
  {
    name: '',
    orderBy: '',
  },
]

export const deckTableData: Cell[] = [
  {
    name: 'Question',
    orderBy: 'question',
  },
  {
    name: 'Answer',
    orderBy: 'answer',
  },
  {
    name: 'Last Updated',
    orderBy: 'updated',
  },
  {
    name: 'Grade',
    orderBy: 'grade',
  },
]
