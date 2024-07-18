import BinIcon from '@/assets/svg/binIcon.svg?react'
import EditIcon from '@/assets/svg/editIcon.svg?react'
import { formatDate } from '@/common/commonFunctions'
import { ViewCloserModal } from '@/components/layouts/modals/viewCloserModal/viewCloserModal'
import { Rating } from '@/components/ui/rating/rating'
import { Card } from '@/services/cards/cardsTypes'

import s from './appTable.module.scss'

export type CardsTableBodyProps = {
  isMyDeck: boolean
  onDeleteCardTriggerClick: (cardId: string) => void
  onEditCardTriggerClick: (cardData: Card) => void
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
            <button onClick={() => onEditCardTriggerClick(item)} title={'Edit card'}>
              <EditIcon />
            </button>
            <button onClick={() => onDeleteCardTriggerClick(item.id)} title={'Delete card'}>
              <BinIcon />
            </button>
          </div>
        </td>
      )}
    </tr>
  )
}
