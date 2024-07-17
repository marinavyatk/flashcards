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

export const cardsApi = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<Card, CreateCardArgs>({
        invalidatesTags: ['Cards', 'Decks'],
        query: ({ id, ...args }) => {
          const formData = new FormData()

          Object.entries({ ...args }).forEach(([key, value]) => {
            formData.append(key, value ? value : '')
          })

          return {
            body: formData,
            method: 'POST',
            url: `/v1/decks/${id}/cards`,
          }
        },
      }),
      deleteCard: builder.mutation<void, DeleteCard>({
        invalidatesTags: ['Cards', 'Decks'],
        async onQueryStarted({ cardId }, { dispatch, getState, queryFulfilled }) {
          const patchResult: any = []
          const invalidateBy = decksApi.util.selectInvalidatedBy(getState(), [{ type: 'Cards' }])

          invalidateBy.forEach(({ originalArgs }) => {
            patchResult.push(
              dispatch(
                decksApi.util.updateQueryData('retrieveCardsInDeck', originalArgs, draft => {
                  const indexItemToDelete = draft.items.findIndex(deck => deck.id === cardId)

                  if (indexItemToDelete === -1) {
                    return
                  } else {
                    draft.items = draft.items.filter((_, index) => index !== indexItemToDelete)
                  }
                })
              )
            )
          })
          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
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
          params: args ?? undefined,
          url: `/v1/decks/${deckId}/learn`,
        }),
      }),
      saveCardGrade: builder.mutation<Card, SaveCardGradeArgs>({
        invalidatesTags: ['Cards'],
        query: ({ deckId, ...args }) => ({
          body: args,
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
          const patchResult: any = []
          const invalidateBy = decksApi.util.selectInvalidatedBy(getState(), [{ type: 'Cards' }])
          const questionImgObjectURL = questionImg ? URL.createObjectURL(questionImg) : ''
          const answerImgObjectURL = answerImg ? URL.createObjectURL(answerImg) : ''

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
                      answerImg:
                        answerImg === undefined
                          ? draft.items[indexItemToUpdate].answerImg
                          : answerImgObjectURL,
                      questionImg:
                        questionImg === undefined
                          ? draft.items[indexItemToUpdate].questionImg
                          : questionImgObjectURL,
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
            questionImgObjectURL && URL.revokeObjectURL(questionImgObjectURL)
            answerImgObjectURL && URL.revokeObjectURL(answerImgObjectURL)
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
  useRetrieveRandomCardQuery,
  useSaveCardGradeMutation,
  useUpdateCardMutation,
} = cardsApi
