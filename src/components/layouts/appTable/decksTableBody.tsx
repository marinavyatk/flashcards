import { Link } from 'react-router-dom'

import BinIcon from '@/assets/svg/binIcon.svg?react'
import EditIcon from '@/assets/svg/editIcon.svg?react'
import PlayIcon from '@/assets/svg/playIcon.svg?react'
import PrivateIcon from '@/assets/svg/privateIcon.svg?react'
import { formatDate } from '@/common/commonFunctions'
import { Deck } from '@/services/decks/decks.types'

import s from './appTable.module.scss'

export type DecksTableBodyProps = {
  onDeleteDeckTriggerClick: (deckData: Deck) => void
  onEditDeckTriggerClick: (deckData: Deck) => void
  onGoToDeck?: () => void
  onLearn: (deck: Deck) => void
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

type DecksTableRowProps = {
  item: Deck
} & Omit<DecksTableBodyProps, 'tableRowsData'>

const DecksTableRow = (props: DecksTableRowProps) => {
  const { item, onDeleteDeckTriggerClick, onEditDeckTriggerClick, onGoToDeck, onLearn, userId } =
    props
  const isMyDeck = item.author.id === userId
  const isDeckEmpty = item.cardsCount === 0
  const learnDeckTitle = isDeckEmpty
    ? 'You need to have at least one card to learn the deck'
    : 'Learn deck'
  const handleGoToDeck = () => {
    onGoToDeck?.()
  }

  return (
    <tr key={item.id}>
      <td>
        <Link className={s.deckMainInfo} onClick={handleGoToDeck} to={`/decks/${item.id}`}>
          {item.cover && (
            <div className={s.imgContainer}>
              <img alt={'Deck cover'} src={item.cover} />
            </div>
          )}
          <span className={s.deckName}>{item.name}</span>
        </Link>
      </td>
      <td>{item.cardsCount}</td>
      <td>{formatDate(item.updated)}</td>
      <td>{item.author.name}</td>
      <td>
        <div className={s.actions}>
          {item.isPrivate && (
            <span title={'This sign means that only you can see the deck'}>
              <PrivateIcon />
            </span>
          )}
          <button disabled={isDeckEmpty} title={learnDeckTitle}>
            {isDeckEmpty ? (
              <PlayIcon />
            ) : (
              <Link to={`/decks/${item.id}/learn`}>
                <PlayIcon onClick={() => onLearn(item)} />
              </Link>
            )}
          </button>
          {isMyDeck && (
            <>
              <button onClick={() => onEditDeckTriggerClick(item)} title={'Edit deck'}>
                <EditIcon />
              </button>
              <button onClick={() => onDeleteDeckTriggerClick(item)} title={'Delete deck'}>
                <BinIcon />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}
