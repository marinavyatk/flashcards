import { formatDate } from '@/common/commonFunctions'
import { Actions } from '@/components/layouts/appTable/actions/actions'
import { DeleteButton } from '@/components/layouts/appTable/actions/buttons/deleteButton'
import { EditButton } from '@/components/layouts/appTable/actions/buttons/editButton'
import { ViewCloserModal } from '@/components/layouts/modals/viewCloserModal/viewCloserModal'
import { Rating } from '@/components/ui/rating/rating'
import { Card } from '@/services/cards/cardsTypes'

import s from '../appTable.module.scss'

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
        {item.questionImg && (
          <ViewCloserModal
            imgSrc={item.questionImg}
            triggerImgProps={{ alt: 'Question image', className: s.modalImg }}
          />
        )}
        <span>{item.question}</span>
      </td>
      <td>
        {item.answerImg && (
          <ViewCloserModal
            imgSrc={item.answerImg}
            triggerImgProps={{ alt: 'Answer image', className: s.modalImg }}
          />
        )}
        <span> {item.answer}</span>
      </td>
      <td className={s.date}>{formatDate(item.updated)}</td>
      <td>
        <Rating cardId={item.id} grade={item.grade} />
      </td>
      {isMyDeck && (
        <td>
          <Actions>
            <EditButton onClick={() => onEditCardTriggerClick(item)} />
            <DeleteButton onClick={() => onDeleteCardTriggerClick(item.id)} />
          </Actions>
        </td>
      )}
    </tr>
  )
}
