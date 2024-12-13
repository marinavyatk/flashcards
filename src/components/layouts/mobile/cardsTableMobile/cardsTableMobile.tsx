import { ComponentPropsWithoutRef } from 'react'

import BinIcon from '@/assets/svg/binIcon.svg?react'
import EditIcon from '@/assets/svg/editIcon.svg?react'
import { formatDate } from '@/common/commonFunctions'
import {
  CardsTableBodyProps,
  CardsTableRowProps,
} from '@/components/layouts/appTable/cardsTableBody'
import { ViewCloserModal } from '@/components/layouts/modals/viewCloserModal/viewCloserModal'
import { Picture } from '@/components/ui/picture'
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
              trigger={
                <Picture
                  alt={'Question'}
                  containerProps={{ className: s.imgContainer }}
                  src={item.questionImg}
                />
              }
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
              trigger={
                <Picture
                  alt={'Answer'}
                  containerProps={{ className: s.imgContainer }}
                  src={item.answerImg}
                />
              }
            />
          )}
          <Typography className={s.text} variant={'body2'}>
            {item.answer}
          </Typography>
        </div>
      </div>
      {isMyDeck && (
        <div className={s.actions}>
          <button onClick={() => onEditCardTriggerClick(item)} title={'Edit card'} type={'button'}>
            <EditIcon />
          </button>
          <button
            onClick={() => onDeleteCardTriggerClick(item.id)}
            title={'Delete card'}
            type={'button'}
          >
            <BinIcon />
          </button>
        </div>
      )}
    </div>
  )
}
