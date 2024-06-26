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
        providesTags: ['Cards'],
        query: args => ({
          method: 'GET',
          url: `/v1/decks/${args.id}`,
        }),
      }),
      updateDeck: builder.mutation<Deck, UpdateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: ({ id, ...body }) => ({
          body: { ...body } ?? undefined,
          method: 'PATCH',
          url: `/v1/decks/${id}`,
        }),
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
