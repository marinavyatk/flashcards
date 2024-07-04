import { Link } from 'react-router-dom'

import EditIcon from '@/assets/svg/editIcon.svg?react'
import PlayIcon from '@/assets/svg/playIcon.svg?react'
import { formatDate } from '@/common/commonFunctions'
import { useModalStateHandler } from '@/common/customHooks/useModalStateHandler'
import { ConfirmDeleteModal } from '@/components/layouts/modals/confirmDeleteModal/confirmDeleteModal'
import { EditDeckModal } from '@/components/layouts/modals/editDeck/editDeck'
import { Deck, UpdateDeckArgs } from '@/services/decks/decks.types'

import s from './appTable.module.scss'

type DecksTableRowProps = {
  item: Deck
} & Omit<DecksTableBodyProps, 'tableRowsData'>

const DecksTableRow = (props: DecksTableRowProps) => {
  const { item, onConfirmDelete, onEdit, onGoToDeck, onLearn, userId } = props
  const { modalState, toggleModalHandler } = useModalStateHandler<'delete' | 'edit'>({
    delete: false,
    edit: false,
  })
  const isMyDeck = item.author.id === userId
  const handleGoToDeck = () => {
    onGoToDeck?.()
  }

  return (
    <tr key={item.id}>
      <td>
        <Link className={s.deckMainInfo} onClick={handleGoToDeck} to={`/decks/${item.id}`}>
          {item.cover && <img alt={'Deck cover'} src={item.cover} />}
          <span className={s.deckName}>{item.name}</span>
        </Link>
      </td>
      <td>{item.cardsCount}</td>
      <td>{formatDate(item.created)}</td>
      <td>{item.author.name}</td>
      <td>
        <div className={s.actions}>
          <button>
            <PlayIcon onClick={() => onLearn(item.id)} />
          </button>
          {isMyDeck && (
            <>
              <button onClick={() => toggleModalHandler('edit', true)}>
                <EditIcon />
              </button>
              {modalState.edit && (
                <EditDeckModal
                  id={item.id}
                  onClose={() => toggleModalHandler('edit', false)}
                  onFormSubmit={onEdit}
                  open={modalState.edit}
                />
              )}
            </>
          )}
          {isMyDeck && (
            <ConfirmDeleteModal
              deletedElement={'Deck'}
              elementName={item.name}
              onClose={() => toggleModalHandler('delete', false)}
              onConfirm={() => onConfirmDelete(item.id)}
              open={modalState.delete}
              triggerProps={{ onClick: () => toggleModalHandler('delete', true) }}
            />
          )}
        </div>
      </td>
    </tr>
  )
}

export type DecksTableBodyProps = {
  onConfirmDelete: (id: string) => void
  onEdit: (data: UpdateDeckArgs) => void
  onGoToDeck?: () => void
  onLearn: (id: string) => void
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
