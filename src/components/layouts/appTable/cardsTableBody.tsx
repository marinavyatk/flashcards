import BinIcon from '@/assets/svg/binIcon.svg?react'
import EditIcon from '@/assets/svg/editIcon.svg?react'
import RatingStar from '@/assets/svg/ratingStar.svg?react'
import RatingStarEmpty from '@/assets/svg/ratingStarEmpty.svg?react'
import { formatDate } from '@/common/commonFunctions'
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

const CardsTableRow = (props: CardsTableRowProps) => {
  const { isMyDeck, item, onDeleteCardTriggerClick, onEditCardTriggerClick } = props
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
