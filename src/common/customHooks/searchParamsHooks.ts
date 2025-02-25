import { useSearchParams } from 'react-router-dom'

import {
  orderByValueDefault,
  pageDefault,
  selectMinValue,
  tabSwitcherValueDefault,
} from '@/common/constants'

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
    if (value !== tabSwitcherValueDefault) {
      searchParams.set('deckOwnership', value)
    } else {
      searchParams.delete('deckOwnership')
    }
    searchParams.delete('currentPage')
    setSearchParams(searchParams)
  }

  const handleOrderByChange = (value: string) => {
    if (value !== orderByValueDefault) {
      searchParams.set('orderBy', value)
    } else {
      searchParams.delete('orderBy')
    }
    searchParams.delete('currentPage')
    setSearchParams(searchParams)
  }

  const handleCurrentPageChange = (value: number) => {
    if (value !== pageDefault) {
      searchParams.set('currentPage', String(value))
    } else {
      searchParams.delete('currentPage')
    }
    setSearchParams(searchParams)
  }

  const handlePageSizeChange = (value: string) => {
    if (value !== String(selectMinValue)) {
      searchParams.set('pageSize', value)
    } else {
      searchParams.delete('pageSize')
    }
    searchParams.delete('currentPage')
    setSearchParams(searchParams)
  }

  const handleSearchInputChange = (debouncedInputValue: string) => {
    if (search === debouncedInputValue || (search === null && debouncedInputValue === '')) {
      return
    }
    if (debouncedInputValue) {
      searchParams.set('search', debouncedInputValue)
    } else {
      searchParams.delete('search')
    }
    searchParams.delete('currentPage')
    setSearchParams(searchParams)
  }

  const clearFilters = () => {
    searchParams.delete('search')
    handleSearchInputChange('')
    searchParams.delete('minCardsCount')
    searchParams.delete('maxCardsCount')
    searchParams.delete('deckOwnership')
    searchParams.delete('orderBy')
    searchParams.delete('currentPage')
    setSearchParams(searchParams)
  }

  return {
    clearFilters,
    currentPage,
    deckOwnership,
    handleCardsCountChange,
    handleCurrentPageChange,
    handleOrderByChange,
    handlePageSizeChange,
    handleSearchInputChange,
    handleSwitchDeckOwnership,
    maxCardsCount,
    minCardsCount,
    orderBy,
    pageSize,
    search,
    searchParams,
    setSearchParams,
  }
}
