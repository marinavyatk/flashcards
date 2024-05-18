export type Card = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}

export type CreateCardArgs = {
  answer: string
  answerImg?: string
  answerVideo?: string
  id: string
  question: string
  questionImg?: string
  questionVideo?: string
}

export type RetrieveRandomCardArgs = {
  deckId: string
  previousCardId?: string
}

export type SaveCardGradeArgs = {
  cardId: string
  deckId: string
  grade: number
}

export type GetCardArgs = {
  cardId: string
}

export type UpdateCardArg = {
  cardId: string
} & Omit<Partial<CreateCardArgs>, 'id'>

export type DeleteCard = GetCardArgs
