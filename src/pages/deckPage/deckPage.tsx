import { Link, useNavigate, useParams } from 'react-router-dom'

import {
  useAppSearchParams,
  useDebouncedInputSearchValue,
} from '@/common/customHooks/searchParamsHooks'
import { useModalStateHandler } from '@/common/customHooks/useModalStateHandler'
import { addNewCardFormValues } from '@/common/formValidation'
import { routes } from '@/common/router'
import { cardsTableData } from '@/common/tableData'
import { AppPagination } from '@/components/layouts/appPagination/appPagination'
import { CardsTableBody } from '@/components/layouts/appTable/cardsTableBody'
import { TableHead } from '@/components/layouts/appTable/tableHead'
import { BackLink } from '@/components/layouts/backLink/backLink'
import { AddNewCardModal } from '@/components/layouts/modals/addNewCardModal/addNewCardModal'
import { ConfirmDeleteModal } from '@/components/layouts/modals/confirmDeleteModal/confirmDeleteModal'
import { EditCardModal } from '@/components/layouts/modals/editCardModal/editCardModal'
import { EditDeckModal } from '@/components/layouts/modals/editDeckModal/editDeckModal'
import { PageTemplate } from '@/components/layouts/pageTemplate/pageTemplate'
import { Button } from '@/components/ui/button'
import { SettingDropdown } from '@/components/ui/dropdownMenu/settingDropdown/settingDropdown'
import { Table } from '@/components/ui/table'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { useGetCurrentUserDataQuery } from '@/services/auth/authApi'
import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
} from '@/services/cards/cardsApi'
import { UpdateDeckArgs } from '@/services/decks/decks.types'
import {
  useDeleteDeckMutation,
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
    searchParams,
    setSearchParams,
  } = useAppSearchParams()
  const { handleSearchChange, inputValue } = useDebouncedInputSearchValue()

  const navigate = useNavigate()

  const { modalState, toggleModalHandler } = useModalStateHandler<
    'deleteCard' | 'deleteDeck' | 'editCard' | 'editDeck'
  >({
    deleteCard: { cardId: '', open: false },
    deleteDeck: false,
    editCard: { cardId: '', open: false },
    editDeck: false,
  })
  const [updateDeck, { isLoading: isUpdateDeckLoading }] = useUpdateDeckMutation()
  const [deleteDeck, { isLoading: isDeleteDeckLoading }] = useDeleteDeckMutation()
  const [createCard, { isLoading: isCreateCardLoading }] = useCreateCardMutation()
  const [deleteCard, { isLoading: isDeleteCardLoading }] = useDeleteCardMutation()
  const [updateCard, { isLoading: isUpdateCardLoading }] = useUpdateCardMutation()
  const showTopLoader =
    isUpdateDeckLoading ||
    isDeleteDeckLoading ||
    isUpdateCardLoading ||
    isCreateCardLoading ||
    isDeleteCardLoading
  const { data: userData } = useGetCurrentUserDataQuery()
  const { data: deckData } = useRetrieveDeckQuery({ id: deckId ? deckId : '' })
  const { data: cards, isLoading: isCardsLoading } = useRetrieveCardsInDeckQuery({
    currentPage: currentPage ? Number(currentPage) : undefined,
    id: deckId ? deckId : '',
    itemsPerPage: pageSize ? Number(pageSize) : 10,
    orderBy: orderBy,
    question: search ? search : undefined,
  })

  const isMyDeck = deckData?.userId === userData?.id

  const handleAddNewCard = (data: addNewCardFormValues) => {
    createCard({ ...data, id: deckId ? deckId : '' })
    searchParams.delete('currentPage')
    searchParams.delete('orderBy')
    searchParams.delete('search')
    handleSearchChange('')
    setSearchParams(searchParams)
  }

  const handleEditDeck = (data: UpdateDeckArgs) => {
    updateDeck(data)
  }

  const handleBackClick = () => {
    const urlSearchParams = localStorage.getItem('urlSearchParams')

    if (urlSearchParams) {
      navigate(routes.private.main + urlSearchParams)
    } else {
      navigate(routes.private.main)
    }
  }

  const handleDeleteDeck = () => {
    deleteDeck({ id: deckId ? deckId : '' })
    handleBackClick()
  }

  const handleLearn = () => {
    navigate(`/decks/${deckData?.id}/learn`, { state: { deckData: deckData } })
  }

  const handleDeleteCard = () => {
    deleteCard({ cardId: modalState.deleteCard.cardId })
  }

  const handleEditCardTriggerClick = (cardId: string) => {
    toggleModalHandler('editCard', { cardId: cardId, open: true })
  }
  const handleDeleteCardTriggerClick = (cardId: string) => {
    toggleModalHandler('deleteCard', { cardId: cardId, open: true })
  }

  if (deckData?.cardsCount === 0) {
    return (
      <PageTemplate isLoading={isCardsLoading} showTopLoader={showTopLoader}>
        <div className={s.noCardsContainer}>
          <BackLink onClick={handleBackClick}>Back to Decks List</BackLink>
          <Typography as={'h1'} className={s.deckName} variant={'large'}>
            {deckData?.name}
          </Typography>
          {deckData?.cover && (
            <img alt={'Deck cover'} className={s.deckCover} src={deckData?.cover} />
          )}
          <div className={s.noCardMessage}>
            {isMyDeck ? (
              <>
                <Typography variant={'body1'}>
                  This pack is empty. Click add new card to fill this pack
                </Typography>
                <AddNewCardModal onFormSubmit={handleAddNewCard} />
              </>
            ) : (
              <Typography variant={'body1'}>This pack is empty.</Typography>
            )}
          </div>
        </div>
      </PageTemplate>
    )
  }

  return (
    <PageTemplate isLoading={isCardsLoading} showTopLoader={showTopLoader}>
      <div className={s.deckPage}>
        <BackLink onClick={handleBackClick}>Back to Decks List</BackLink>
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
                  onConfirmDelete={() => toggleModalHandler('deleteDeck', true)}
                  onEdit={() => toggleModalHandler('editDeck', true)}
                  onLearn={handleLearn}
                />
              )}
            </div>
            {isMyDeck ? (
              <AddNewCardModal onFormSubmit={handleAddNewCard} />
            ) : (
              <Button as={Link} state={{ deckData: deckData }} to={`/decks/${deckData?.id}/learn`}>
                Learn to Pack
              </Button>
            )}
          </div>
          {deckData?.cover && (
            <img alt={'Deck cover'} className={s.deckCover} src={deckData?.cover} />
          )}
          <TextField onValueChange={handleSearchChange} type={'search'} value={inputValue} />

          {cards?.items.length ? (
            <Table
              thead={
                <tr>
                  <TableHead
                    cellsData={cardsTableData}
                    changeSort={handleOrderByChange}
                    currentOrderBy={orderBy}
                    defaultValue={'updated-desc'}
                  />
                  {isMyDeck && <th></th>}
                </tr>
              }
            >
              <CardsTableBody
                isMyDeck={isMyDeck}
                onDeleteCardTriggerClick={handleDeleteCardTriggerClick}
                onEditCardTriggerClick={handleEditCardTriggerClick}
                tableRowsData={cards.items}
              />
            </Table>
          ) : (
            <Typography className={s.noMatchingCaption} variant={'body1'}>
              No matching results. Change the search terms and try again
            </Typography>
          )}
          <AppPagination
            paginationProps={{
              currentPage: cards?.pagination.currentPage || 1,
              onPageChange: handleCurrentPageChange,
              totalCount: cards?.pagination.totalItems || 1,
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

      <ConfirmDeleteModal
        deletedElement={'Deck'}
        needShowTrigger={false}
        onClose={() => toggleModalHandler('deleteDeck', false)}
        onConfirm={handleDeleteDeck}
        open={modalState?.deleteDeck}
      />
      <ConfirmDeleteModal
        deletedElement={'Card'}
        needShowTrigger={false}
        onClose={() => toggleModalHandler('deleteCard', false)}
        onConfirm={handleDeleteCard}
        open={modalState.deleteCard.open}
      />

      {modalState.editDeck && (
        <EditDeckModal
          id={deckData?.id || ''}
          onClose={() => toggleModalHandler('editDeck', false)}
          onFormSubmit={handleEditDeck}
          open={modalState?.editDeck}
        />
      )}
      {modalState.editCard.open && (
        <EditCardModal
          cardId={modalState.editCard.cardId}
          onClose={() => toggleModalHandler('editCard', false)}
          onFormSubmit={updateCard}
          open={modalState.editCard.open}
        />
      )}
    </PageTemplate>
  )
}
