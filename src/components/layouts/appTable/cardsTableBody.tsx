import BinIcon from '@/assets/svg/binIcon.svg?react'
import EditIcon from '@/assets/svg/editIcon.svg?react'
import RatingStar from '@/assets/svg/ratingStar.svg?react'
import RatingStarEmpty from '@/assets/svg/ratingStarEmpty.svg?react'
import { formatDate } from '@/common/commonFunctions'
import { ViewCloserModal } from '@/components/layouts/modals/viewCloserModal/viewCloserModal'
import { Card } from '@/services/cards/cardsTypes'

import s from './appTable.module.scss'

export type CardsTableBodyProps = {
  isMyDeck: boolean
  onDeleteCardTriggerClick: (cardId: string) => void
  onEditCardTriggerClick: (cardId: string) => void
  tableRowsData: Card[]
}

export type CardsTableRowProps = { item: Card } & Omit<CardsTableBodyProps, 'tableRowsData'>

export const CardsTableBody = (props: CardsTableBodyProps) => {
  const { tableRowsData, ...restProps } = props
  const tableRows = tableRowsData.map(item => {
    return <CardsTableRow item={item} key={item.id} {...restProps} />
  })

  return <>{tableRows}</>
}

type RatingProps = {
  cardId: string
  grade: number
}
const Rating = (props: RatingProps) => {
  const { cardId, grade } = props
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className={s.grade}>
      {stars.map(star => {
        if (grade >= star) {
          return <RatingStar key={star + cardId} />
        }

        return <RatingStarEmpty key={star + cardId} />
      })}
    </div>
  )
}

const CardsTableRow = (props: CardsTableRowProps) => {
  const { isMyDeck, item, onDeleteCardTriggerClick, onEditCardTriggerClick } = props

  return (
    <tr>
      <td>
        <div className={s.cellWithImg}>
          {item.questionImg && (
            <ViewCloserModal
              imgSrc={item.questionImg}
              trigger={<img alt={'Question deck'} className={s.modalImg} src={item.questionImg} />}
            />
          )}
          <span>{item.question}</span>
        </div>
      </td>
      <td>
        <div className={s.cellWithImg}>
          {item.answerImg && (
            <ViewCloserModal
              imgSrc={item.answerImg}
              trigger={<img alt={'Question deck'} className={s.modalImg} src={item.answerImg} />}
            />
          )}
          <span> {item.answer}</span>
        </div>
      </td>
      <td>{formatDate(item.updated)}</td>
      <td>
        <Rating cardId={item.id} grade={item.grade} />
      </td>
      {isMyDeck && (
        <td>
          <div className={s.actions}>
            <button onClick={() => onEditCardTriggerClick(item.id)}>
              <EditIcon />
            </button>
            <button onClick={() => onDeleteCardTriggerClick(item.id)}>
              <BinIcon />
            </button>
          </div>
        </td>
      )}
    </tr>
  )
}
