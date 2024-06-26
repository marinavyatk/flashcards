import BinIcon from '@/assets/svg/binIcon.svg?react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import * as Dialog from '@radix-ui/react-dialog'

import s from '../modals.module.scss'

export type DeletedElement = 'Card' | 'Deck'

export type AddNewDeckModalProps = {
  deletedElement: DeletedElement
  elementName?: string
  onConfirm: () => void
  triggerText?: string
}
export const ConfirmDeleteModal = ({
  deletedElement,
  elementName,
  onConfirm,
  triggerText,
}: AddNewDeckModalProps) => {
  return (
    <Modal
      modalHeader={`Add New ${deletedElement}`}
      trigger={
        <button className={s.triggerButton}>
          <BinIcon /> {triggerText && triggerText}
        </button>
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
