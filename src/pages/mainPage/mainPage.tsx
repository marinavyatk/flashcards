import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import BinIcon from '@/assets/svg/binIcon.svg?react'
import { useAppSearchParams, useDebouncedInputSearchValue } from '@/common/customHooks'
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

export const MainPage = () => {
  const { data: userData } = useGetCurrentUserDataQuery()
  const { data: minMaxData } = useGetMinMaxCardAmountQuery()
  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const { handleSearchChange, inputValue } = useDebouncedInputSearchValue()
  const {
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
  } = useAppSearchParams({ max: minMaxData?.max ?? 1, min: minMaxData?.min ?? 0 })

  const { data } = useGetDecksQuery({
    authorId: deckOwnership ? deckOwnership : undefined,
    currentPage: currentPage ? Number(currentPage) : undefined,
    itemsPerPage: pageSize ? Number(pageSize) : undefined,
    maxCardsCount: maxCardsCount !== null ? Number(maxCardsCount) : minMaxData?.max || 0,
    minCardsCount: minCardsCount !== null ? Number(minCardsCount) : minMaxData?.min || 0,
    name: search ?? undefined,
    orderBy: orderBy,
  })

  const clearFilters = () => {
    searchParams.delete('search')
    searchParams.delete('minCardsCount')
    searchParams.delete('maxCardsCount')
    searchParams.delete('deckOwnership')
    searchParams.delete('orderBy')
    searchParams.delete('currentPage')
    setSearchParams(searchParams)
  }

  const cardsNumbersFromSearchParams = useMemo(() => {
    if (!minMaxData) {
      return undefined
    }

    return [
      minCardsCount !== null ? Number(minCardsCount) : minMaxData.min,
      maxCardsCount !== null ? Number(maxCardsCount) : minMaxData?.max,
    ]
  }, [minMaxData, minCardsCount, maxCardsCount])

  const handleDeleteDeck = (id: string) => {
    deleteDeck({ id })
  }

  const handleAddNewDeck = (data: CreateDeckArgs) => {
    createDeck(data)
  }
  // const { key , search} = useLocation()

  console.log(useLocation())

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
            value={inputValue}
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
