import { Card } from '@/services/cards/cardsTypes'

export type DecksListResponse = {
  items: Deck[]
  pagination: Pagination
}
export type Author = {
  id: string
  name: string
}
export type Deck = {
  author: Author
  cardsCount: number
  cover: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}
export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type GetDecksArgs = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: null | string
}

export type CreateDeckArgs = {
  cover?: File
  isPrivate?: boolean
  name: string
}

export type UpdateDeckArgs = {
  id?: string
} & Partial<CreateDeckArgs>

export type DeleteDeckArgs = {
  id: string
}

export type MinMaxCardAmountResponse = {
  max: number
  min: number
}

export type RetrieveDeckArgs = DeleteDeckArgs

export type RetrieveCardsInDeckArgs = {
  answer?: string
  currentPage?: number
  id: string
  itemsPerPage?: number
  orderBy?: null | string
  question?: string
}
export type RetrieveCardsInDeckResponse = {
  items: Card[]
  pagination: Pagination
}
