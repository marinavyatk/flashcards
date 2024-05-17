//Временная страинца для настройки запросов

import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/textField'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decksApi'

export function DecksPage() {
  // const [minCardsCount, setMinCardsCount] = useState(0)
  // const [maxCardsCount, setMaxCardsCount] = useState(30)
  // const [authorId, setAuthorId] = useState('')
  // const [currentPage, setCurrentPage] = useState(1)
  // const [itemsPerPage, setItemsPerPage] = useState(10)

  const [searchParams, setSearchParams] = useSearchParams()

  const handleSearchChange = (value: string) => {
    if (value.length) {
      searchParams.set('search', value)
    } else {
      searchParams.delete('search')
    }
    setSearchParams(searchParams)
  }

  const search = searchParams.get('search') ?? undefined
  const { data, error, isLoading } = useGetDecksQuery({
    // authorId: authorId,
    // currentPage: currentPage,
    // itemsPerPage: itemsPerPage,
    // maxCardsCount: maxCardsCount,
    // minCardsCount: minCardsCount,
    name: search,
  })

  const [createDeck] = useCreateDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>
  }
  console.log(search)

  return (
    <div>
      <Button onClick={() => createDeck({ name: 'my new deck' })}>Create Deck</Button>
      <Button onClick={() => updateDeck({ id: 'clwb1d1bu02ubo101xzxmak2j', name: 'updated deck' })}>
        Update Deck
      </Button>
      <Button onClick={() => deleteDeck({ id: 'clwb1d1bu02ubo101xzxmak2j' })}>Delete Deck</Button>
      <TextField onValueChange={handleSearchChange} type={'search'} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cards</th>
            <th>Last Updated</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map(deck => {
            const updatedAt = new Date(deck.updated).toLocaleDateString('ru-RU')

            return (
              <tr key={deck.id}>
                <td>{deck.name}</td>
                <td>{deck.cardsCount}</td>
                <td>{updatedAt}</td>
                <td>{deck.author.name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
