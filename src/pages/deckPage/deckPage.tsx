import { useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import ArrowBackIcon from '@/assets/svg/arrowBack.svg?react'
import { debounce } from '@/common/commonFunctions'
import { deckTableData } from '@/common/tableData'
import { addNewCardFormValues } from '@/components/forms/formValidation'
import { AppPagination } from '@/components/layouts/appPagination/appPagination'
import { TableBodyCards, TableHead } from '@/components/layouts/appTable/appTable'
import { AddNewCardModal } from '@/components/layouts/modals/addNewCardModal/addNewCardModal'
import { Button } from '@/components/ui/button'
import { SettingDropdown } from '@/components/ui/dropdownMenu/settingDropdown/settingDropdown'
import { Table } from '@/components/ui/table'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { PageTemplate } from '@/pages/PageTemplate/pageTemplate'
import { useGetCurrentUserDataQuery } from '@/services/auth/authApi'
import { useCreateCardMutation, useDeleteCardMutation } from '@/services/cards/cardsApi'
import { useRetrieveCardsInDeckQuery, useRetrieveDeckQuery } from '@/services/decks/decksApi'

import s from './deckPage.module.scss'

let debounceHandler: any = null

export const DeckPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { deckId } = useParams()
  const search = searchParams.get('search')
  const orderBy = searchParams.get('orderBy')
  const pageSize = searchParams.get('pageSize')
  const currentPage = searchParams.get('currentPage')
  const [inputSearchValue, setInputSearchValue] = useState(search ?? '')

  const navigate = useNavigate()

  const [createCard] = useCreateCardMutation()
  const [deleteCard] = useDeleteCardMutation()

  const { data: userData } = useGetCurrentUserDataQuery()
  const { data: deckData } = useRetrieveDeckQuery({ id: deckId ? deckId : '' })
  const { data: cards } = useRetrieveCardsInDeckQuery({
    currentPage: currentPage ? Number(currentPage) : undefined,
    id: deckId ? deckId : '',
    itemsPerPage: pageSize ? Number(pageSize) : 10,
    orderBy: orderBy,
    question: search ? search : undefined,
  })

  const isMyDeck = cards?.items?.[0]?.userId === userData?.id

  console.log(cards)

  const handleAddNewCard = (data: addNewCardFormValues) => {
    createCard({ ...data, id: deckId ? deckId : '' })
  }

  const handleDeleteCard = (cardId: string) => {
    deleteCard({ cardId })
  }

  const handleSearchChange = (value: string) => {
    setInputSearchValue(value)
  }

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

  const handleOrderByChange = (value: string) => {
    if (value !== 'updated-desc') {
      searchParams.set('orderBy', value)
    } else {
      searchParams.delete('orderBy')
    }
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
  const handlePageSizeChange = (value: string) => {
    if (value !== '10') {
      searchParams.set('pageSize', value)
    } else {
      searchParams.delete('pageSize')
    }
    searchParams.delete('currentPage')
    setSearchParams(searchParams)
  }

  if (!cards?.items.length) {
    return (
      <PageTemplate>
        <div className={s.noCardsContainer}>
          <Typography
            as={'button'}
            className={s.backLink}
            onClick={() => navigate(-1)}
            variant={'body2'}
          >
            <ArrowBackIcon /> Back to Decks List
          </Typography>
          <Typography as={'h1'} className={s.deckName} variant={'large'}>
            {deckData?.name}
          </Typography>
          {deckData?.cover && (
            <img alt={'Deck cover'} className={s.deckCover} src={deckData?.cover} />
          )}
          <div className={s.noCardMessage}>
            <Typography variant={'body1'}>
              This pack is empty. Click add new card to fill this pack
            </Typography>
            <AddNewCardModal onFormSubmit={handleAddNewCard} />
          </div>
        </div>
      </PageTemplate>
    )
  }

  return (
    <PageTemplate>
      <div className={s.deckPage}>
        <Typography
          as={'button'}
          className={s.backLink}
          onClick={() => navigate(-1)}
          variant={'body2'}
        >
          <ArrowBackIcon /> Back to Decks List
        </Typography>
        <div className={s.deckContainer}>
          <div className={s.actions}>
            <div className={s.deckNameWithOptions}>
              <Typography as={'h1'} className={s.deckName} variant={'large'}>
                {deckData?.name}
              </Typography>
              {isMyDeck && (
                <SettingDropdown
                  deletedElement={'Deck'}
                  elementName={deckData?.name ?? ''}
                  id={deckData?.id ?? ''}
                  onConfirmDelete={handleDeleteCard}
                />
              )}
            </div>
            {isMyDeck ? (
              <AddNewCardModal onFormSubmit={handleAddNewCard} />
            ) : (
              <Button>Learn to Pack</Button>
            )}
          </div>
          {deckData?.cover && (
            <img alt={'Deck cover'} className={s.deckCover} src={deckData?.cover} />
          )}
          <TextField onValueChange={handleSearchChange} type={'search'} value={inputSearchValue} />
          <Table
            thead={
              <tr>
                <TableHead
                  cellsData={deckTableData}
                  changeSort={handleOrderByChange}
                  currentOrderBy={orderBy}
                  defaultValue={'updated-desc'}
                />
                {isMyDeck && <th></th>}
              </tr>
            }
          >
            <TableBodyCards
              isMyDeck={isMyDeck}
              onConfirmDelete={handleDeleteCard}
              tableRowsData={cards.items}
            />
          </Table>
          <AppPagination
            paginationProps={{
              currentPage: cards?.pagination.currentPage || 1,
              onPageChange: handleCurrentPageChange,
              totalCount: cards.pagination.totalItems,
            }}
            selectProps={{
              rootProps: {
                onValueChange: handlePageSizeChange,
                value: pageSize ? pageSize : undefined,
              },
            }}
          />
        </div>
      </div>
    </PageTemplate>
  )
}
