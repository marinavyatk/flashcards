import { Link } from 'react-router-dom'

import PrivateIcon from '@/assets/svg/privateIcon.svg?react'
import { formatDate } from '@/common/commonFunctions'
import { Actions } from '@/components/layouts/appTable/actions/actions'
import { DeleteButton } from '@/components/layouts/appTable/actions/buttons/deleteButton'
import { EditButton } from '@/components/layouts/appTable/actions/buttons/editButton'
import { LearnButton } from '@/components/layouts/appTable/actions/buttons/learnButton'
import { Picture } from '@/components/ui/picture'
import { Deck } from '@/services/decks/decks.types'

import s from '../appTable.module.scss'

export type DecksTableBodyProps = {
  onDeleteDeckTriggerClick: (deckData: Deck) => void
  onEditDeckTriggerClick: (deckData: Deck) => void
  onGoToDeck?: () => void
  tableRowsData: Deck[]
  userId: string
}

export const DecksTableBody = (props: DecksTableBodyProps) => {
  const { tableRowsData, ...restProps } = props

  if (!tableRowsData.length) {
    return null
  }

  const tableRows = tableRowsData.map(item => {
    return <DecksTableRow item={item} key={item.id} {...restProps} />
  })

  return <>{tableRows}</>
}

export type DecksTableRowProps = {
  item: Deck
} & Omit<DecksTableBodyProps, 'tableRowsData'>

const DecksTableRow = (props: DecksTableRowProps) => {
  const { item, onDeleteDeckTriggerClick, onEditDeckTriggerClick, onGoToDeck, userId } = props
  const isMyDeck = item.author.id === userId
  const isDeckEmpty = item.cardsCount === 0
  const handleGoToDeck = () => {
    onGoToDeck?.()
  }

  return (
    <tr key={item.id}>
      <td>
        <Link className={s.deckMainInfo} onClick={handleGoToDeck} to={`/decks/${item.id}`}>
          {item.cover && (
            <Picture
              alt={'Deck cover'}
              containerProps={{ className: s.imgContainer }}
              src={item.cover}
            />
          )}
          <span className={s.deckName}>{item.name}</span>
        </Link>
      </td>
      <td>{item.cardsCount}</td>
      <td className={s.date}>{formatDate(item.updated)}</td>
      <td>{item.author.name}</td>
      <td>
        <Actions>
          {item.isPrivate && (
            <span title={'This sign means that only you can see the deck'}>
              <PrivateIcon />
            </span>
          )}
          <LearnButton deckId={item.id} isDeckEmpty={isDeckEmpty} />
          {isMyDeck && (
            <>
              <EditButton onClick={() => onEditDeckTriggerClick(item)} />
              <DeleteButton onClick={() => onDeleteDeckTriggerClick(item)} />
            </>
          )}
        </Actions>
      </td>
    </tr>
  )
}
