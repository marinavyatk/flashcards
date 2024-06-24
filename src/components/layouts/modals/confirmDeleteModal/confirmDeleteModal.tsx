import BinIcon from '@/assets/svg/binIcon.svg?react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import * as Dialog from '@radix-ui/react-dialog'

import s from '../modals.module.scss'

type DeletedElement = 'Card' | 'Deck'

export type AddNewDeckModalProps = {
  deletedElement: DeletedElement
  elementName?: string
  onConfirm: () => void
}
export const ConfirmDeleteModal = ({
  deletedElement,
  elementName,
  onConfirm,
}: AddNewDeckModalProps) => {
  return (
    <Modal
      modalHeader={`Add New ${deletedElement}`}
      trigger={
        <Button>
          <BinIcon />
        </Button>
      }
    >
      <div className={s.modalContent}>
        {deletedElement === 'Card' ? (
          <Typography>
            Do you really want to remove this card? <br />
          </Typography>
        ) : (
          <Typography>
            Do you really want to remove {elementName}? <br />
            All cards will be deleted.
          </Typography>
        )}
        <div className={s.buttonsBlock}>
          <Dialog.Close asChild>
            <Button variant={'secondary'}>Cancel</Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button onClick={onConfirm}>Delete {deletedElement}</Button>
          </Dialog.Close>
        </div>
      </div>
    </Modal>
  )
}
