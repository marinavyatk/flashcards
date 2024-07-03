import { Link, useNavigate, useParams } from 'react-router-dom'

import ArrowBackIcon from '@/assets/svg/arrowBack.svg?react'
import {
  useAppSearchParams,
  useDebouncedInputSearchValue,
} from '@/common/customHooks/searchParamsHooks'
import { useModalStateHandler } from '@/common/customHooks/useModalStateHandler'
import { routes } from '@/common/router'
import { deckTableData } from '@/common/tableData'
import { addNewCardFormValues } from '@/components/forms/formValidation'
import { AppPagination } from '@/components/layouts/appPagination/appPagination'
import { CardsTableBody } from '@/components/layouts/appTable/cardsTableBody'
import { TableHead } from '@/components/layouts/appTable/tableHead'
import { AddNewCardModal } from '@/components/layouts/modals/addNewCardModal/addNewCardModal'
import { ConfirmDeleteModal } from '@/components/layouts/modals/confirmDeleteModal/confirmDeleteModal'
import { EditDeckModal } from '@/components/layouts/modals/editDeck/editDeck'
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

  const { modalState, toggleModalHandler } = useModalStateHandler<'delete' | 'edit'>({
    delete: false,
    edit: false,
  })

  const [createCard] = useCreateCardMutation()
  const [deleteCard] = useDeleteCardMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const [updateCard] = useUpdateCardMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const { data: userData } = useGetCurrentUserDataQuery()
  const { data: deckData } = useRetrieveDeckQuery({ id: deckId ? deckId : '' })
  const { data: cards, isLoading } = useRetrieveCardsInDeckQuery({
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
    searchParams.delete('currentPage')
    searchParams.delete('orderBy')
    searchParams.delete('question')
    setSearchParams(searchParams)
  }

  const handleDeleteDeck = () => {
    deleteDeck({ id: deckId ? deckId : '' })
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
  const handleLearn = () => {
    navigate(`/learn/${deckData?.id}/${randomCardData?.id}`)
  }

  if (isLoading) {
    return <div>Loading...</div>
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
      <EditDeckModal
        id={deckData.id}
        onClose={() => toggleModalHandler('edit', false)}
        onFormSubmit={handleEditDeck}
        open={modalState?.edit}
      />
      <ConfirmDeleteModal
        deletedElement={'Deck'}
        needShowTrigger={false}
        onClose={() => toggleModalHandler('delete', false)}
        onConfirm={handleDeleteDeck}
        open={modalState?.delete}
      />
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
                  onConfirmDelete={() => toggleModalHandler('delete', true)}
                  onEdit={() => toggleModalHandler('edit', true)}
                  onLearn={handleLearn}
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
            <CardsTableBody
              isMyDeck={isMyDeck}
              onConfirmDelete={deleteCard}
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
