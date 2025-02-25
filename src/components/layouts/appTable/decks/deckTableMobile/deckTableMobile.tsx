import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import PrivateIcon from '@/assets/svg/privateIcon.svg?react'
import { formatDate } from '@/common/commonFunctions'
import { Actions } from '@/components/layouts/appTable/actions/actions'
import { DeleteButton } from '@/components/layouts/appTable/actions/buttons/deleteButton'
import { EditButton } from '@/components/layouts/appTable/actions/buttons/editButton'
import { LearnButton } from '@/components/layouts/appTable/actions/buttons/learnButton'
import {
  DecksTableBodyProps,
  DecksTableRowProps,
} from '@/components/layouts/appTable/decks/decksTableBody'
import { Picture } from '@/components/ui/picture'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './deckTableMobile.module.scss'

export type DeckTableMobileProps = {
  containerProps?: ComponentPropsWithoutRef<'div'>
} & DecksTableBodyProps

export const DeckTableMobile = (props: DeckTableMobileProps) => {
  const { containerProps, tableRowsData, ...restProps } = props
  const classNames = clsx(s.decksList, containerProps?.className)

  if (!tableRowsData.length) {
    return null
  }
  const tableRows = tableRowsData.map(item => {
    return <DeckTableItem item={item} key={item.id} {...restProps} />
  })

  return <div className={classNames}>{tableRows}</div>
}

export const DeckTableItem = (props: DecksTableRowProps) => {
  const { item, onDeleteDeckTriggerClick, onEditDeckTriggerClick, onGoToDeck, userId } = props
  const isMyDeck = item.author.id === userId
  const isDeckEmpty = item.cardsCount === 0
  const handleGoToDeck = () => {
    onGoToDeck?.()
  }

  return (
    <div className={s.deckCard}>
      <Link className={s.deckMainInfo} onClick={handleGoToDeck} to={`/decks/${item.id}`}>
        {item.cover && (
          <Picture
            alt={'Deck cover'}
            containerProps={{ className: s.imgContainer }}
            src={item.cover}
          />
        )}
        <div className={s.nameBlock}>
          {item.isPrivate && <PrivateIcon />}
          <Typography className={s.name} variant={'subtitle1'}>
            {item.name}
          </Typography>
        </div>
      </Link>
      <div className={s.deckInfo}>
        <div className={s.row}>
          <Typography variant={'subtitle2'}>Cards</Typography>
          <Typography variant={'body2'}>{item.cardsCount}</Typography>
        </div>
        <div className={s.row}>
          <Typography variant={'subtitle2'}>Last Updated</Typography>
          <Typography variant={'body2'}>{formatDate(item.updated)}</Typography>
        </div>
        <div className={s.row}>
          <Typography variant={'subtitle2'}>Created by</Typography>
          <Typography variant={'body2'}>{item.author.name}</Typography>
        </div>
      </div>
      <Actions>
        <LearnButton deckId={item.id} isDeckEmpty={isDeckEmpty} />
        {isMyDeck && (
          <>
            <EditButton onClick={() => onEditDeckTriggerClick(item)} />
            <DeleteButton onClick={() => onDeleteDeckTriggerClick(item)} />
          </>
        )}
      </Actions>
    </div>
  )
}
