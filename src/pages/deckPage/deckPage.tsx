import { Link, useOutletContext, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  useAppSearchParams,
  useDebouncedInputSearchValue,
} from '@/common/customHooks/searchParamsHooks'
import { useModalStateHandler } from '@/common/customHooks/useModalStateHandler'
import { useShowErrors } from '@/common/customHooks/useShowErrors'
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
import { UserData } from '@/services/auth/authApiTypes'
import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
} from '@/services/cards/cardsApi'
import { Card, UpdateCardArg } from '@/services/cards/cardsTypes'
import { Deck, UpdateDeckArgs } from '@/services/decks/decks.types'
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
  const { modalState, toggleModalHandler } = useModalStateHandler<
    'deleteCard' | 'deleteDeck' | 'editCard' | 'editDeck'
  >({
    deleteCard: { cardData: {}, open: false },
    deleteDeck: false,
    editCard: { cardData: {}, open: false },
    editDeck: false,
  })
  const [updateDeck, { error: updateDeckError, isLoading: isUpdateDeckLoading }] =
    useUpdateDeckMutation()
  const [deleteDeck, { error: deleteDeckError, isLoading: isDeleteDeckLoading }] =
    useDeleteDeckMutation()
  const [createCard, { error: createCardError, isLoading: isCreateCardLoading }] =
    useCreateCardMutation()
  const [deleteCard, { error: deleteCardError, isLoading: isDeleteCardLoading }] =
    useDeleteCardMutation()
  const [updateCard, { error: updateCardError, isLoading: isUpdateCardLoading }] =
    useUpdateCardMutation()
  const showTopLoader =
    isUpdateDeckLoading ||
    isDeleteDeckLoading ||
    isUpdateCardLoading ||
    isCreateCardLoading ||
    isDeleteCardLoading
  const userData: UserData = useOutletContext()
  const { data: deckData, error: getDeckError } = useRetrieveDeckQuery({ id: deckId ? deckId : '' })
  const {
    data: cards,
    error: getCardsError,
    isLoading: isCardsLoading,
  } = useRetrieveCardsInDeckQuery({
    currentPage: currentPage ? Number(currentPage) : undefined,
    id: deckId ? deckId : '',
    itemsPerPage: pageSize ? Number(pageSize) : 10,
    orderBy: orderBy,
    question: search ? search : undefined,
  })

  const isMyDeck = deckData?.userId === userData?.id

  const handleEditDeck = (data: UpdateDeckArgs) => {
    updateDeck(data)
  }

  const handleDeleteDeck = async () => {
    await deleteDeck({ id: deckId ? deckId : '' }).then(handleBackClick)
  }

  const handleAddNewCard = (data: addNewCardFormValues) => {
    createCard({ ...data, id: deckId ? deckId : '' })
    searchParams.delete('currentPage')
    searchParams.delete('orderBy')
    searchParams.delete('search')
    handleSearchChange('')
    setSearchParams(searchParams)
  }

  const handleDeleteCard = () => {
    deleteCard({ cardId: modalState.deleteCard.cardId })
  }

  const handleUpdateCard = async (data: UpdateCardArg) => {
    await updateCard(data).then(() => toast.success('Card successfully updated'))
  }

  const handleEditCardTriggerClick = (cardData: Card) => {
    toggleModalHandler('editCard', { cardData: cardData, open: true })
  }
  const handleDeleteCardTriggerClick = (cardId: string) => {
    toggleModalHandler('deleteCard', { cardId: cardId, open: true })
  }

  const handleBackClick = () => {
    const urlSearchParams = localStorage.getItem('urlSearchParams')

    if (urlSearchParams) {
      return routes.private.main + urlSearchParams
    } else {
      return routes.private.main
    }
  }
  const backLink = handleBackClick()

  const errors = [
    getDeckError,
    deleteDeckError,
    updateDeckError,
    getCardsError,
    createCardError,
    deleteCardError,
    updateCardError,
  ]

  useShowErrors(errors)

  if (deckData?.cardsCount === 0) {
    return (
      <PageTemplate isLoading={isCardsLoading} showTopLoader={showTopLoader}>
        <div className={s.noCardsContainer}>
          <BackLink to={backLink}>Back to Decks List</BackLink>
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
        <BackLink to={backLink}>Back to Decks List</BackLink>
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
                  learnPath={`/decks/${deckData?.id}/learn`}
                  onConfirmDelete={() => toggleModalHandler('deleteDeck', true)}
                  onEdit={() => toggleModalHandler('editDeck', true)}
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
        elementName={deckData?.name}
        needShowTrigger={false}
        onClose={() => toggleModalHandler('deleteDeck', false)}
        onConfirm={handleDeleteDeck}
        open={modalState?.deleteDeck}
      />
      <ConfirmDeleteModal
        deletedElement={'Card'}
        needShowTrigger={false}
        onClose={() => toggleModalHandler('deleteCard', { cardData: null, open: false })}
        onConfirm={handleDeleteCard}
        open={modalState.deleteCard.open}
      />

      {modalState.editDeck && (
        <EditDeckModal
          deckData={deckData ?? ({} as Deck)}
          onClose={() => toggleModalHandler('editDeck', false)}
          onFormSubmit={handleEditDeck}
          open={modalState?.editDeck}
        />
      )}
      {modalState.editCard.open && (
        <EditCardModal
          cardData={modalState.editCard.cardData}
          onClose={() => toggleModalHandler('editCard', { cardData: null, open: false })}
          onFormSubmit={handleUpdateCard}
          open={modalState.editCard.open}
        />
      )}
    </PageTemplate>
  )
}
