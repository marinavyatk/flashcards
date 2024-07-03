import RatingStar from '@/assets/svg/ratingStar.svg?react'
import RatingStarEmpty from '@/assets/svg/ratingStarEmpty.svg?react'
import { formatDate } from '@/common/commonFunctions'
import { useModalStateHandler } from '@/common/customHooks'
import { ConfirmDeleteModal } from '@/components/layouts/modals/confirmDeleteModal/confirmDeleteModal'
import { EditCardModal } from '@/components/layouts/modals/editCard/editCard'
import { Card, UpdateCardArg } from '@/services/cards/cardsTypes'

import s from './appTable.module.scss'

export type CardsTableBodyProps = {
  isMyDeck: boolean
  onConfirmDelete: (id: string) => void
  onEditCard: (data: UpdateCardArg) => void
  tableRowsData: Card[]
}

export type CardsTableRowProps = { item: Card } & Omit<CardsTableBodyProps, 'tableRowsData'>

const CardsTableRow = (props: CardsTableRowProps) => {
  const { isMyDeck, item, onConfirmDelete, onEditCard } = props
  const { modalState, toggleModalHandler } = useModalStateHandler<'delete' | 'edit'>({
    delete: false,
    edit: false,
  })
  const getRating = (grade: number) => {
    const rating = []

    for (let i = 0; i < 5; i++) {
      rating.push(<RatingStarEmpty key={i} />)
    }
    rating.fill(<RatingStar />, 0, grade)

    return rating
  }

  return (
    <tr>
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
            <EditCardModal
              cardId={item.id}
              onClose={() => toggleModalHandler('edit', false)}
              onFormSubmit={onEditCard}
              open={modalState.edit}
            />
            <ConfirmDeleteModal
              deletedElement={'Card'}
              onClose={() => toggleModalHandler('delete', false)}
              onConfirm={() => {
                onConfirmDelete({ cardId: item.id })
              }}
              open={modalState.delete}
              triggerProps={{ onClick: () => toggleModalHandler('delete', true) }}
            />
          </div>
        </td>
      )}
    </tr>
  )
}

export const CardsTableBody = (props: CardsTableBodyProps) => {
  const { tableRowsData, ...restProps } = props
  const tableRows = tableRowsData.map(item => {
    return <CardsTableRow item={item} key={item.id} {...restProps} />
  })

  return <>{tableRows}</>
}
