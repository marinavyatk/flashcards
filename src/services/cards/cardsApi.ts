import {
  Card,
  CreateCardArgs,
  DeleteCard,
  GetCardArgs,
  RetrieveRandomCardArgs,
  SaveCardGradeArgs,
  UpdateCardArg,
} from '@/services/cards/cardsTypes'
import { decksApi } from '@/services/decks/decksApi'
import { flashcardsApi } from '@/services/flashcards-api'
import { PatchCollection } from '@reduxjs/toolkit/dist/query/core/buildThunks'

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
        async onQueryStarted(
          { answerImg, cardId, questionImg, ...args },
          { dispatch, getState, queryFulfilled }
        ) {
          const patchResult: PatchCollection = []
          const invalidateBy = decksApi.util.selectInvalidatedBy(getState(), [{ type: 'Cards' }])
          const formData = new FormData()

          const questionImgObjectURL = questionImg ? URL.createObjectURL(questionImg) : ''
          const answerImgObjectURL = answerImg ? URL.createObjectURL(answerImg) : ''

          formData.append('questionImg', questionImgObjectURL ?? '')
          formData.append('answerImg', answerImgObjectURL ?? '')

          invalidateBy.forEach(({ originalArgs }) => {
            patchResult.push(
              dispatch(
                decksApi.util.updateQueryData('retrieveCardsInDeck', originalArgs, draft => {
                  const indexItemToUpdate = draft.items.findIndex(deck => deck.id === cardId)

                  if (indexItemToUpdate === -1) {
                    return
                  } else {
                    Object.assign(draft.items[indexItemToUpdate], {
                      ...args,
                      answerImg: answerImgObjectURL,
                      questionImg: questionImgObjectURL,
                    })
                  }
                })
              )
            )
          })
          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          } finally {
            questionImgObjectURL &&
              setTimeout(() => URL.revokeObjectURL(questionImgObjectURL), 3000)
            answerImgObjectURL && setTimeout(() => URL.revokeObjectURL(answerImgObjectURL), 3000)
          }
        },
        query: ({ cardId, ...args }) => {
          const formData = new FormData()

          Object.entries({ ...args }).forEach(([key, value]) => {
            formData.append(key, value !== null ? value : '')
          })

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
  useLazyRetrieveRandomCardQuery,
  useRetrieveRandomCardQuery,
  useSaveCardGradeMutation,
  useUpdateCardMutation,
} = cardsApi
