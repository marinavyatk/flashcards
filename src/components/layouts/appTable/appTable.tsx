import { Link } from 'react-router-dom'

import PlayIcon from '@/assets/svg/playIcon.svg?react'
import RatingStar from '@/assets/svg/ratingStar.svg?react'
import RatingStarEmpty from '@/assets/svg/ratingStarEmpty.svg?react'
import { formatDate } from '@/common/commonFunctions'
import { ConfirmDeleteModal } from '@/components/layouts/modals/confirmDeleteModal/confirmDeleteModal'
import { EditCardModal } from '@/components/layouts/modals/editCard/editCard'
import { EditDeckModal } from '@/components/layouts/modals/editDeck/editDeck'
import { SortElement } from '@/components/ui/sortElement/sortElement'
import { Card } from '@/services/cards/cardsTypes'
import { Deck, UpdateDeckArgs } from '@/services/decks/decks.types'

import s from './appTable.module.scss'

export type Cell = {
  name: string
  orderBy: string
  sorted: boolean
}

export type TableHeadProps = {
  cellsData: Cell[]
  changeSort: (sort: string) => void
  currentOrderBy: null | string
  defaultValue: string
}

export const TableHead = (props: TableHeadProps) => {
  const { cellsData, changeSort, currentOrderBy, defaultValue } = props
  const tableHeadCells = cellsData.map(item => {
    return (
      <th className={s.th} key={item.orderBy}>
        <SortElement
          changeSort={changeSort}
          currentOrderBy={currentOrderBy}
          defaultValue={defaultValue}
          orderBy={item.orderBy}
        >
          {item.name}
        </SortElement>
      </th>
    )
  })

  return <>{tableHeadCells}</>
}

export type TableBodyProps = {
  onConfirmDelete: (id: string) => void
  onEdit: (id: string) => void
  tableRowsData: Deck[]
  userId: string
}

export const TableBodyDecks = (props: TableBodyProps) => {
  const { onConfirmDelete, onEdit, tableRowsData, userId } = props
  const tableRows = tableRowsData.map(item => {
    const isMyDeck = item.author.id === userId

    return (
      <tr key={item.id}>
        <td>
          <Link className={s.deckMainInfo} to={`/decks/${item.id}`}>
            {item.cover && <img alt={'Deck cover'} src={item.cover} />}
            {item.name}
          </Link>
        </td>
        <td>{item.cardsCount}</td>
        <td>{formatDate(item.created)}</td>
        <td>{item.author.name}</td>
        <td>
          <div className={s.actions}>
            <button>
              <PlayIcon />
            </button>
            {isMyDeck && <EditDeckModal id={item.id} onFormSubmit={onEdit} />}
            {isMyDeck && (
              <ConfirmDeleteModal
                deletedElement={'Deck'}
                elementName={item.name}
                onConfirm={() => onConfirmDelete(item.id)}
              />
            )}
          </div>
        </td>
      </tr>
    )
  })

  return <>{tableRows}</>
}

export type TableBodyCardsProps = {
  isMyDeck: boolean
  onConfirmDelete: (id: string) => void
  onEditCard: (data: UpdateDeckArgs) => void
  tableRowsData: Card[]
}

export const TableBodyCards = (props: TableBodyCardsProps) => {
  const { isMyDeck, onConfirmDelete, onEditCard, tableRowsData } = props

  const getRating = (grade: number) => {
    const rating = []

    for (let i = 0; i < 5; i++) {
      rating.push(<RatingStarEmpty key={i} />)
    }
    rating.fill(<RatingStar />, 0, grade)

    return rating
  }

  const tableRows = tableRowsData.map(item => {
    return (
      <tr key={item.id}>
        <td>
          <div className={s.cellWithImg}>
            {item.questionImg && <img alt={'Question deck'} src={item.questionImg} />}
            <span>{item.question}</span>
          </div>
        </td>
        <td>
          <div className={s.cellWithImg}>
            {item.answerImg && <img alt={'Question deck'} src={item.answerImg} />}
            <span> {item.answer}</span>
          </div>
        </td>
        <td>{formatDate(item.updated)}</td>
        <td>
          <div className={s.grade}>{getRating(item.grade)}</div>
        </td>
        {isMyDeck && (
          <td>
            <div className={s.actions}>
              <EditCardModal cardId={item.id} onFormSubmit={onEditCard} />

              <ConfirmDeleteModal
                deletedElement={'Card'}
                onConfirm={() => onConfirmDelete(item.id)}
              />
            </div>
          </td>
        )}
      </tr>
    )
  })

  return <>{tableRows}</>
}
