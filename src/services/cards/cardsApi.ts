import {
  Card,
  CreateCardArgs,
  DeleteCard,
  GetCardArgs,
  RetrieveRandomCardArgs,
  SaveCardGradeArgs,
  UpdateCardArg,
} from '@/services/cards/cardsTypes'
import { flashcardsApi } from '@/services/flashcards-api'

//There may be problems with tags
export const cardsApi = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<Card, CreateCardArgs>({
        invalidatesTags: ['Cards', 'Decks'],
        query: ({ id, ...args }) => {
          const formData = new FormData()

          formData.append('answer', args.answer)
          formData.append('question', args.question)

          if (args.answerImg) {
            formData.append('answerImg', args.answerImg)
          }
          if (args.questionImg) {
            formData.append('questionImg', args.questionImg)
          }
          if (args.answerVideo) {
            formData.append('answerVideo', args.answerVideo)
          }
          if (args.questionVideo) {
            formData.append('questionVideo', args.questionVideo)
          }

          return {
            body: formData,
            method: 'POST',
            url: `/v1/decks/${id}/cards`,
          }
        },
      }),
      deleteCard: builder.mutation<void, DeleteCard>({
        invalidatesTags: ['Cards', 'Decks'],
        query: args => ({
          method: 'DELETE',
          url: `/v1/cards/${args.cardId}`,
        }),
      }),
      getCard: builder.query<Card, GetCardArgs>({
        providesTags: ['Cards'],
        query: args => ({
          method: 'GET',
          url: `/v1/cards/${args.cardId}`,
        }),
      }),
      retrieveRandomCard: builder.query<Card, RetrieveRandomCardArgs>({
        providesTags: ['RandomCard'],
        query: ({ deckId, ...args }) => ({
          method: 'GET',
          params: { ...args } ?? undefined,
          url: `/v1/decks/${deckId}/learn`,
        }),
      }),
      saveCardGrade: builder.mutation<Card, SaveCardGradeArgs>({
        invalidatesTags: ['Cards', 'RandomCard'],
        query: ({ deckId, ...args }) => ({
          body: { ...args },
          method: 'POST',
          url: `/v1/decks/${deckId}/learn`,
        }),
      }),
      updateCard: builder.mutation<Card, UpdateCardArg>({
        invalidatesTags: ['Cards'],
        query: ({ cardId, ...args }) => {
          const formData = new FormData()

          if (args.answer) {
            formData.append('answer', args.answer)
          }
          if (args.question) {
            formData.append('question', args.question)
          }
          if (args.answerImg) {
            formData.append('answerImg', args.answerImg)
          }
          if (args.questionImg) {
            formData.append('questionImg', args.questionImg)
          }
          if (args.answerVideo) {
            formData.append('answerVideo', args.answerVideo)
          }
          if (args.questionVideo) {
            formData.append('questionVideo', args.questionVideo)
          }

          return {
            body: formData,
            method: 'PATCH',
            url: `/v1/cards/${cardId}`,
          }
        },
      }),
    }
  },
})

export const {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardQuery,
  useRetrieveRandomCardQuery,
  useSaveCardGradeMutation,
  useUpdateCardMutation,
} = cardsApi
