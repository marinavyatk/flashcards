import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import ArrowBackIcon from '@/assets/svg/arrowBack.svg?react'
import { useAppSearchParams, useDebouncedInputSearchValue } from '@/common/customHooks'
import { routes } from '@/common/router'
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
import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useRetrieveRandomCardQuery,
  useUpdateCardMutation,
} from '@/services/cards/cardsApi'
import { UpdateDeckArgs } from '@/services/decks/decks.types'
import {
  useRetrieveCardsInDeckQuery,
  useRetrieveDeckQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decksApi'

import s from './deckPage.module.scss'

export const DeckPage = () => {
  const { deckId } = useParams()
  const {
    currentPage,
    handleCurrentPageChange,
    handleOrderByChange,
    handlePageSizeChange,
    orderBy,
    pageSize,
    search,
  } = useAppSearchParams()
  const { handleSearchChange, inputValue } = useDebouncedInputSearchValue()

  const navigate = useNavigate()

  const [createCard] = useCreateCardMutation()
  const [deleteCard] = useDeleteCardMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const [updateCard] = useUpdateCardMutation()

  const { data: userData } = useGetCurrentUserDataQuery()
  const { data: deckData } = useRetrieveDeckQuery({ id: deckId ? deckId : '' })
  const { data: cards } = useRetrieveCardsInDeckQuery({
    currentPage: currentPage ? Number(currentPage) : undefined,
    id: deckId ? deckId : '',
    itemsPerPage: pageSize ? Number(pageSize) : 10,
    orderBy: orderBy,
    question: search ? search : undefined,
  })

  const { data: randomCardData } = useRetrieveRandomCardQuery({
    deckId: deckData?.id ? deckData?.id : '',
  })

  const isMyDeck = deckData?.userId === userData?.id

  const handleAddNewCard = (data: addNewCardFormValues) => {
    createCard({ ...data, id: deckId ? deckId : '' })
  }

  const handleDeleteCard = (cardId: string) => {
    deleteCard({ cardId })
  }
  const handleEditDeck = (data: UpdateDeckArgs) => {
    updateDeck(data)
  }

  const handleBackClick = () => {
    const urlSearchParams = localStorage.getItem('urlSearchParams')

    if (urlSearchParams) {
      navigate(routes.main + urlSearchParams)
    } else {
      navigate(routes.main)
    }
  }

  if (!cards?.items.length) {
    return (
      <PageTemplate>
        <div className={s.noCardsContainer}>
          <Typography
            as={'button'}
            className={s.backLink}
            onClick={handleBackClick}
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
          onClick={handleBackClick}
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
                  onEdit={handleEditDeck}
                />
              )}
            </div>
            {isMyDeck ? (
              <AddNewCardModal onFormSubmit={handleAddNewCard} />
            ) : (
              <Button as={Link} to={`/learn/${deckData?.id}/${randomCardData?.id}`}>
                Learn to Pack
              </Button>
            )}
          </div>
          {deckData?.cover && (
            <img alt={'Deck cover'} className={s.deckCover} src={deckData?.cover} />
          )}
          <TextField onValueChange={handleSearchChange} type={'search'} value={inputValue} />
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
              onEditCard={updateCard}
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
