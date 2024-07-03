import { ComponentPropsWithoutRef } from 'react'

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
  needShowTrigger?: boolean
  onClose?: boolean
  onConfirm: () => void
  open?: boolean
  triggerProps?: ComponentPropsWithoutRef<'button'>
}
export const ConfirmDeleteModal = (props: AddNewDeckModalProps) => {
  const {
    deletedElement,
    elementName,
    needShowTrigger = true,
    onClose,
    onConfirm,
    open,
    triggerProps,
  } = props

  return (
    <Modal
      modalHeader={`Delete ${deletedElement}`}
      rootProps={{
        onOpenChange: callbackValue => {
          if (!callbackValue) {
            onClose()
          }
        },
        open: open,
      }}
      trigger={
        needShowTrigger && (
          <button className={s.triggerButton} {...triggerProps}>
            <BinIcon />
          </button>
        )
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
