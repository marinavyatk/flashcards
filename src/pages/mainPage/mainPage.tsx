import { useMemo } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { toast } from 'react-toastify'

import BinIcon from '@/assets/svg/binIcon.svg?react'
import { selectMinValue } from '@/common/constants'
import {
  useAppSearchParams,
  useDebouncedInputSearchValue,
} from '@/common/customHooks/searchParamsHooks'
import { useShowErrors } from '@/common/customHooks/useShowErrors'
import { decksTableData } from '@/common/tableData'
import { AppPagination } from '@/components/layouts/appPagination/appPagination'
import { DecksTableBody } from '@/components/layouts/appTable/decksTableBody'
import { TableHead } from '@/components/layouts/appTable/tableHead'
import { AddNewDeckModal } from '@/components/layouts/modals/addNewDeckModal/addNewDeckModal'
import { PageTemplate } from '@/components/layouts/pageTemplate/pageTemplate'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tabSwitcher'
import { Table } from '@/components/ui/table'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { CreateDeckArgs, Deck, UpdateDeckArgs } from '@/services/decks/decks.types'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardAmountQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decksApi'

import s from './mainPage.module.scss'

export const MainPage = () => {
  const userData = useOutletContext()
  const {
    data: minMaxData,
    error: minMaxError,
    isLoading: isMinMaxLoading,
  } = useGetMinMaxCardAmountQuery()
  const [createDeck, { error: createDeckError, isLoading: isCreateDeckLoading }] =
    useCreateDeckMutation()
  const [deleteDeck, { error: deleteDeckError, isLoading: isDeleteDeckLoading }] =
    useDeleteDeckMutation()
  const [updateDeck, { error: updateDeckError, isLoading: isUpdateDeckLoading }] =
    useUpdateDeckMutation()
  const { search: urlSearchParams } = useLocation()
  const navigate = useNavigate()
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

  const {
    data: decksData,
    error: getDecksError,
    isLoading: isDecksLoading,
  } = useGetDecksQuery({
    authorId: deckOwnership ? deckOwnership : undefined,
    currentPage: currentPage ? Number(currentPage) : undefined,
    itemsPerPage: pageSize ? Number(pageSize) : undefined,
    maxCardsCount: maxCardsCount !== null ? Number(maxCardsCount) : minMaxData?.max || 0,
    minCardsCount: minCardsCount !== null ? Number(minCardsCount) : minMaxData?.min || 0,
    name: search ?? undefined,
    orderBy: orderBy,
  })
  const errors = [getDecksError, minMaxError, createDeckError, deleteDeckError, updateDeckError]

  useShowErrors(errors)

  const clearFilters = () => {
    searchParams.delete('search')
    handleSearchChange('')
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
    searchParams.delete('search')
    searchParams.delete('minCardsCount')
    searchParams.delete('maxCardsCount')
    searchParams.delete('orderBy')
    searchParams.delete('currentPage')
    setSearchParams(searchParams)
  }

  const handleEditDeck = async (data: UpdateDeckArgs) => {
    await updateDeck(data).then(toast.success('Deck successfully updated'))
  }

  const handleGoToDeck = () => {
    localStorage.setItem('urlSearchParams', urlSearchParams)
  }

  const handleLearn = async (deck: Deck) => {
    navigate(`/decks/${deck.id}/learn`, { state: { deckData: deck } })
  }

  return (
    <PageTemplate
      isLoading={isDecksLoading || isMinMaxLoading}
      showTopLoader={isCreateDeckLoading || isDeleteDeckLoading || isUpdateDeckLoading}
    >
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
            <Slider
              rootProps={{
                defaultValue: cardsNumbersFromSearchParams,
                key: `${minCardsCount}-${maxCardsCount}`,
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

        {decksData?.items.length ? (
          <Table
            className={s.table}
            thead={
              <tr>
                <TableHead
                  cellsData={decksTableData}
                  changeSort={handleOrderByChange}
                  currentOrderBy={orderBy}
                  defaultValue={'updated-desc'}
                />
              </tr>
            }
          >
            <DecksTableBody
              onConfirmDelete={handleDeleteDeck}
              onEdit={handleEditDeck}
              onGoToDeck={handleGoToDeck}
              onLearn={handleLearn}
              tableRowsData={decksData?.items || []}
              userId={userData?.id || ''}
            />
          </Table>
        ) : (
          <Typography className={s.noMatchingCaption} variant={'body1'}>
            No matching results. Change the search terms and try again
          </Typography>
        )}

        <AppPagination
          className={s.pagination}
          paginationProps={{
            currentPage: decksData?.pagination.currentPage || 1,
            onPageChange: handleCurrentPageChange,
            totalCount: decksData?.pagination.totalItems || 1,
          }}
          selectProps={{
            rootProps: {
              onValueChange: handlePageSizeChange,
              value: pageSize ? pageSize : String(selectMinValue),
            },
          }}
        />
      </div>
    </PageTemplate>
  )
}
