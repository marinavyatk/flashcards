// import type { PatchCollection } from '@reduxjs/toolkit'
import {
  CreateDeckArgs,
  Deck,
  DecksListResponse,
  DeleteDeckArgs,
  GetDecksArgs,
  MinMaxCardAmountResponse,
  RetrieveCardsInDeckArgs,
  RetrieveCardsInDeckResponse,
  RetrieveDeckArgs,
  UpdateDeckArgs,
} from '@/services/decks/decks.types'
import { flashcardsApi } from '@/services/flashcards-api'
import { PatchCollection } from '@reduxjs/toolkit/dist/query/core/buildThunks'

export const decksApi = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: args => {
          const { cover, isPrivate, name } = args
          const formData = new FormData()

          if (cover) {
            formData.append('cover', cover)
          }
          if (name) {
            formData.append('name', name)
          }
          if (isPrivate) {
            formData.append('isPrivate', String(isPrivate))
          }

          return {
            body: formData,
            method: 'POST',
            url: '/v1/decks',
          }
        },
      }),
      deleteDeck: builder.mutation<void, DeleteDeckArgs>({
        invalidatesTags: ['Decks'],
        async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
          const patchResult: PatchCollection = []
          const invalidateBy = decksApi.util.selectInvalidatedBy(getState(), [{ type: 'Decks' }])

          invalidateBy.forEach(({ originalArgs }) => {
            patchResult.push(
              dispatch(
                decksApi.util.updateQueryData('getDecks', originalArgs, draft => {
                  const indexItemToDelete = draft.items.findIndex(deck => deck.id === id)

                  if (indexItemToDelete === -1) {
                    return
                  } else {
                    draft.items = draft.items.filter((item, index) => index !== indexItemToDelete)
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
          url: `/v1/decks/${args.id}`,
        }),
      }),
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => ({
          method: 'GET',
          params: args ?? undefined,
          url: '/v2/decks',
        }),
      }),

      getMinMaxCardAmount: builder.query<MinMaxCardAmountResponse, void>({
        query: () => ({
          method: 'GET',
          url: '/v2/decks/min-max-cards',
        }),
      }),
      retrieveCardsInDeck: builder.query<RetrieveCardsInDeckResponse, RetrieveCardsInDeckArgs>({
        providesTags: ['Cards'],
        query: ({ id, ...args }) => ({
          params: args,
          url: `/v1/decks/${id}/cards`,
        }),
      }),
      retrieveDeck: builder.query<Deck, RetrieveDeckArgs>({
        providesTags: ['Cards', 'Decks'],
        query: args => ({
          method: 'GET',
          url: `/v1/decks/${args.id}`,
        }),
      }),
      updateDeck: builder.mutation<Deck, UpdateDeckArgs>({
        invalidatesTags: ['Decks'],
        async onQueryStarted({ cover, id, ...args }, { dispatch, getState, queryFulfilled }) {
          const patchResult: PatchCollection = []
          const invalidateBy = decksApi.util.selectInvalidatedBy(getState(), [{ type: 'Decks' }])
          const formData = new FormData()

          const coverObjectURL = cover ? URL.createObjectURL(cover) : ''

          formData.append('cover', cover ?? '')
          invalidateBy.forEach(({ originalArgs }) => {
            patchResult.push(
              dispatch(
                decksApi.util.updateQueryData('getDecks', originalArgs, draft => {
                  const indexItemToUpdate = draft.items.findIndex(deck => deck.id === id)

                  if (indexItemToUpdate === -1) {
                    return
                  } else {
                    Object.assign(draft.items[indexItemToUpdate], {
                      ...args,
                      cover: coverObjectURL,
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
            if (coverObjectURL) {
              setTimeout(() => URL.revokeObjectURL(coverObjectURL), 3000)
            }
          }
        },

        query: ({ id, ...body }) => {
          const formData = new FormData()

          Object.entries({ ...body }).forEach(([key, value]) => {
            if (key === 'cover') {
              formData.append('cover', (value ?? '') as string)
            } else {
              formData.append(key, value !== null ? String(value) : '')
            }
          })

          return {
            body: formData,
            method: 'PATCH',
            url: `/v1/decks/${id}`,
          }
        },
      }),
    }
  },
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardAmountQuery,
  useRetrieveCardsInDeckQuery,
  useRetrieveDeckQuery,
  useUpdateDeckMutation,
} = decksApi
