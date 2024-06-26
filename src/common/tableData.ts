import { Cell } from '@/components/layouts/appTable/appTable'

export const decksData: Cell[] = [
  {
    name: 'Deck name',
    orderBy: 'name',
    sorted: true,
  },
  {
    name: 'Cards',
    orderBy: 'cardsCount',
    sorted: true,
  },
  {
    name: 'Last Updated',
    orderBy: 'updated',
    sorted: true,
  },
  {
    name: 'Created by',
    orderBy: 'author.name',
    sorted: true,
  },
  {
    name: '',
    orderBy: '',
    sorted: false,
  },
]

export const deckTableData: Cell[] = [
  {
    name: 'Question',
    orderBy: 'question',
    sorted: true,
  },
  {
    name: 'Answer',
    orderBy: 'answer',
    sorted: true,
  },
  {
    name: 'Last Updated',
    orderBy: 'updated',
    sorted: true,
  },
  {
    name: 'Grade',
    orderBy: 'grade',
    sorted: true,
  },
]
