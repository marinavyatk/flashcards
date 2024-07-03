import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/common/customHooks/useDebounce'

export const useAppSearchParams = (args: { max: number; min: number } | void) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search')
  const orderBy = searchParams.get('orderBy')
  const pageSize = searchParams.get('pageSize')
  const currentPage = searchParams.get('currentPage')
  const minCardsCount = searchParams.get('minCardsCount')
  const maxCardsCount = searchParams.get('maxCardsCount')
  const deckOwnership = searchParams.get('deckOwnership')

  const handleCardsCountChange = (values: number[]) => {
    if (values[0] !== args?.min) {
      searchParams.set('minCardsCount', String(values[0]))
    } else {
      searchParams.delete('minCardsCount')
    }
    if (values[1] !== args?.max) {
      searchParams.set('maxCardsCount', String(values[1]))
    } else {
      searchParams.delete('maxCardsCount')
    }
    searchParams.delete('currentPage')
    setSearchParams(searchParams)
  }

  const handleSwitchDeckOwnership = (value: string) => {
    if (value === 'My Cards') {
      searchParams.set('deckOwnership', '~caller')
    } else {
      searchParams.delete('deckOwnership')
    }
    searchParams.delete('currentPage')
    setSearchParams(searchParams)
  }

  const handleOrderByChange = useCallback(
    (value: string) => {
      if (value !== 'updated-desc') {
        searchParams.set('orderBy', value)
      } else {
        searchParams.delete('orderBy')
      }
      setSearchParams(searchParams)
    },
    [searchParams]
  )

  const handleCurrentPageChange = (value: number) => {
    if (value !== 1) {
      searchParams.set('currentPage', String(value))
    } else {
      searchParams.delete('currentPage')
    }
    setSearchParams(searchParams)
  }

  const handlePageSizeChange = (value: string) => {
    if (value !== '10') {
      searchParams.set('pageSize', value)
    } else {
      searchParams.delete('pageSize')
    }
    searchParams.delete('currentPage')
    setSearchParams(searchParams)
  }

  return useMemo(
    () => ({
      currentPage,
      deckOwnership,
      handleCardsCountChange,
      handleCurrentPageChange,
      handleOrderByChange,
      handlePageSizeChange,
      handleSwitchDeckOwnership,
      maxCardsCount,
      minCardsCount,
      orderBy,
      pageSize,
      search,
      searchParams,
      setSearchParams,
    }),
    [search, orderBy, pageSize, currentPage, minCardsCount, maxCardsCount, deckOwnership]
  )
}

export const useDebouncedInputSearchValue = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search')
  const [inputValue, setInputValue] = useState(search ?? '')

  const debouncedInputValue = useDebounce(inputValue, 1000)
  const handleSearchChange = (value: string) => {
    setInputValue(value)
  }

  useMemo(() => {
    if (debouncedInputValue) {
      searchParams.set('search', debouncedInputValue)
    } else {
      searchParams.delete('search')
    }
    searchParams.delete('currentPage')
    setSearchParams(searchParams)
  }, [debouncedInputValue])

  return { handleSearchChange, inputValue }
}
