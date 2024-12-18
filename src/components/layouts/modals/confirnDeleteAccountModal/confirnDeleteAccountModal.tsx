import { ComponentPropsWithoutRef } from 'react'

import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import * as Dialog from '@radix-ui/react-dialog'

import s from '../modals.module.scss'

export type ConfirmDeleteModalProps = {
  onClose?: () => void
  onConfirm: () => void
  open?: boolean
  triggerProps?: ComponentPropsWithoutRef<'button'>
}
export const ConfirmDeleteAccountModal = (props: ConfirmDeleteModalProps) => {
  const { onClose, onConfirm, open, triggerProps } = props

  return (
    <Modal
      modalHeader={`Delete your account?`}
      rootProps={{
        onOpenChange: callbackValue => {
          if (!callbackValue) {
            onClose?.()
          }
        },
        open: open,
      }}
      trigger={
        <Button type={'button'} variant={'secondary'} {...triggerProps}>
          Delete account
        </Button>
      }
    >
      <div className={s.modalContent}>
        <Typography>
          Do you really want to remove you account? <br />
          It`ll be impossible to cancel this action. All decks and cards will be deleted.
        </Typography>
        <div className={s.buttonsBlock}>
          <Dialog.Close asChild>
            <Button variant={'secondary'}>Cancel</Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button onClick={onConfirm}>Delete account</Button>
          </Dialog.Close>
        </div>
      </div>
    </Modal>
  )
}
