import { ComponentPropsWithoutRef } from 'react'

import { formatDate } from '@/common/commonFunctions'
import { Actions } from '@/components/layouts/appTable/actions/actions'
import { DeleteButton } from '@/components/layouts/appTable/actions/buttons/deleteButton'
import { EditButton } from '@/components/layouts/appTable/actions/buttons/editButton'
import {
  CardsTableBodyProps,
  CardsTableRowProps,
} from '@/components/layouts/appTable/cards/cardsTableBody'
import { ViewCloserModal } from '@/components/layouts/modals/viewCloserModal/viewCloserModal'
import { Rating } from '@/components/ui/rating'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './cardsTableMobile.module.scss'

export type CardsTableMobileProps = {
  containerProps?: ComponentPropsWithoutRef<'div'>
} & CardsTableBodyProps

export const CardsTableMobile = (props: CardsTableMobileProps) => {
  const { containerProps, tableRowsData, ...restProps } = props
  const classNames = clsx(s.cardsList, containerProps?.className)

  if (!tableRowsData.length) {
    return null
  }
  const tableRows = tableRowsData.map(item => {
    return <CardTableItem item={item} key={item.id} {...restProps} />
  })

  return <div className={classNames}>{tableRows}</div>
}

export const CardTableItem = (props: CardsTableRowProps) => {
  const { isMyDeck, item, onDeleteCardTriggerClick, onEditCardTriggerClick } = props

  return (
    <div className={s.card}>
      <div className={s.additionalInfo}>
        <Typography variant={'body2'}>{formatDate(item.updated)}</Typography>
        <Rating cardId={item.id} grade={item.grade} />
      </div>
      <div className={s.mainInfo}>
        <div className={s.field}>
          <Typography className={s.caption} variant={'subtitle2'}>
            Question:
          </Typography>
          {item.questionImg && (
            <ViewCloserModal
              imgSrc={item.questionImg}
              triggerImgProps={{ alt: 'Question image', className: s.imgContainer }}
            />
          )}
          <Typography className={s.text} variant={'body2'}>
            {item.question}
          </Typography>
        </div>
        <div className={s.field}>
          <Typography className={s.caption} variant={'subtitle2'}>
            Answer:
          </Typography>
          {item.answerImg && (
            <ViewCloserModal
              imgSrc={item.answerImg}
              triggerImgProps={{ alt: 'Answer image', className: s.imgContainer }}
            />
          )}
          <Typography className={s.text} variant={'body2'}>
            {item.answer}
          </Typography>
        </div>
      </div>
      {isMyDeck && (
        <Actions>
          <EditButton onClick={() => onEditCardTriggerClick(item)} />
          <DeleteButton onClick={() => onDeleteCardTriggerClick(item.id)} />
        </Actions>
      )}
    </div>
  )
}
