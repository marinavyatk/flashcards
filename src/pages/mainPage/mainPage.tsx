import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import BinIcon from '@/assets/svg/binIcon.svg?react'
import { debounce } from '@/common/commonFunctions'
import { decksData } from '@/common/tableData'
import { AppPagination } from '@/components/layouts/appPagination/appPagination'
import { TableBodyDecks, TableHead } from '@/components/layouts/appTable/appTable'
import { AddNewDeckModal } from '@/components/layouts/modals/addNewDeckModal/addNewDeckModal'
import { Button } from '@/components/ui/button'
import { SliderComponent } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tabSwitcher'
import { Table } from '@/components/ui/table'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { PageTemplate } from '@/pages/PageTemplate/pageTemplate'
import { useGetCurrentUserDataQuery } from '@/services/auth/authApi'
import { CreateDeckArgs } from '@/services/decks/decks.types'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardAmountQuery,
} from '@/services/decks/decksApi'

import s from './mainPage.module.scss'

export let debounceHandler: any = null

export const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search')
  const minCardsCount = searchParams.get('minCardsCount')
  const maxCardsCount = searchParams.get('maxCardsCount')
  const deckOwnership = searchParams.get('deckOwnership')
  const pageSize = searchParams.get('pageSize')
  const currentPage = searchParams.get('currentPage')
  const orderBy = searchParams.get('orderBy')

  const [inputSearchValue, setInputSearchValue] = useState(search ?? '')

  useMemo(() => {
    debounceHandler = debounce(
      () => {
        if (inputSearchValue) {
          searchParams.set('search', inputSearchValue)
        } else {
          searchParams.delete('search')
        }
        searchParams.delete('currentPage')
        setSearchParams(searchParams)
      },
      debounceHandler,
      1000
    )
  }, [inputSearchValue])

  const handleSearchChange = (value: string) => {
    setInputSearchValue(value)
  }

  const handleCardsCountChange = (values: number[]) => {
    if (values[0] !== minMaxData?.min) {
      searchParams.set('minCardsCount', String(values[0]))
    } else {
      searchParams.delete('minCardsCount')
    }
    if (values[1] !== minMaxData?.max) {
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

  const handlePageSizeChange = (value: string) => {
    if (value !== '10') {
      searchParams.set('pageSize', value)
    } else {
      searchParams.delete('pageSize')
    }
    searchParams.delete('currentPage')
    setSearchParams(searchParams)
  }

  const handleCurrentPageChange = (value: number) => {
    if (value !== 1) {
      searchParams.set('currentPage', String(value))
    } else {
      searchParams.delete('currentPage')
    }
    setSearchParams(searchParams)
  }

  const handleOrderByChange = (value: string) => {
    if (value !== 'created-desc') {
      searchParams.set('orderBy', value)
    } else {
      searchParams.delete('orderBy')
    }
    setSearchParams(searchParams)
  }

  const clearFilters = () => {
    searchParams.delete('search')
    setInputSearchValue('')
    searchParams.delete('minCardsCount')
    searchParams.delete('maxCardsCount')
    searchParams.delete('deckOwnership')
    searchParams.delete('orderBy')
    searchParams.delete('currentPage')
    setSearchParams(searchParams)
  }

  const { data: minMaxData } = useGetMinMaxCardAmountQuery()
  const { data: userData } = useGetCurrentUserDataQuery()
  const { data } = useGetDecksQuery({
    authorId: deckOwnership ? deckOwnership : undefined,
    currentPage: currentPage ? Number(currentPage) : undefined,
    itemsPerPage: pageSize ? Number(pageSize) : undefined,
    maxCardsCount: maxCardsCount !== null ? Number(maxCardsCount) : minMaxData?.max || 0,
    minCardsCount: minCardsCount !== null ? Number(minCardsCount) : minMaxData?.min || 0,
    name: search ?? undefined,
    orderBy: orderBy ? orderBy : undefined,
  })

  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const cardsNumbersFromSearchParams = [
    minCardsCount !== null ? Number(minCardsCount) : minMaxData?.min || 0,
    maxCardsCount !== null ? Number(maxCardsCount) : minMaxData?.max || 0,
  ]

  const handleDeleteDeck = (id: string) => {
    deleteDeck({ id })
  }

  const handleAddNewDeck = (data: CreateDeckArgs) => {
    createDeck(data)
  }

  return (
    <PageTemplate>
      <div className={s.mainPage}>
        <div className={s.container}>
          <Typography as={'h1'} variant={'large'}>
            Decks list
          </Typography>
          <AddNewDeckModal onFormSubmit={handleAddNewDeck} />
        </div>
        <div className={s.container}>
          <TextField
            containerProps={{ className: s.searchFilter }}
            onValueChange={handleSearchChange}
            type={'search'}
            value={inputSearchValue}
          />
          <div className={s.elementWithCaption}>
            <Typography as={'span'} variant={'body2'}>
              Show decks cards
            </Typography>
            <TabSwitcher
              defaultValue={'All Cards'}
              itemProps={[{ value: 'My Cards' }, { value: 'All Cards' }]}
              onValueChange={handleSwitchDeckOwnership}
              value={deckOwnership === '~caller' ? 'My Cards' : 'All Cards'}
            />
          </div>
          <div className={s.elementWithCaption}>
            <Typography as={'span'} variant={'body2'}>
              Number of cards
            </Typography>
            <SliderComponent
              rootProps={{
                defaultValue: cardsNumbersFromSearchParams,
                max: minMaxData ? minMaxData.max : undefined,
                min: minMaxData ? minMaxData.min : undefined,
                onValueCommit: handleCardsCountChange,
              }}
            />
          </div>

          <Button onClick={clearFilters} variant={'secondary'}>
            <BinIcon /> Clear Filter
          </Button>
        </div>
        <Table
          className={s.table}
          thead={
            <tr>
              <TableHead
                cellsData={decksData}
                changeSort={handleOrderByChange}
                currentOrderBy={orderBy}
                defaultValue={'updated-desc'}
              />
            </tr>
          }
        >
          {' '}
          <TableBodyDecks
            onConfirmDelete={handleDeleteDeck}
            tableRowsData={data?.items || []}
            userId={userData?.id || ''}
          />
        </Table>
        <AppPagination
          className={s.pagination}
          paginationProps={{
            currentPage: data?.pagination.currentPage || 1,
            onPageChange: handleCurrentPageChange,
            totalCount: data?.pagination.totalItems || 1,
          }}
          selectProps={{
            rootProps: {
              onValueChange: handlePageSizeChange,
              value: pageSize ? pageSize : undefined,
            },
          }}
        />
      </div>
    </PageTemplate>
  )
}
