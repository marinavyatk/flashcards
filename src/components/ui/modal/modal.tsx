import { ComponentPropsWithoutRef, ReactNode } from 'react'

import CloseIcon from '@/assets/svg/closeIcon.svg?react'
import { Typography } from '@/components/ui/typography'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

export type ModalProps = {
  modalHeader: string
  trigger?: ReactNode
} & ComponentPropsWithoutRef<'div'>
export const Modal = (props: ModalProps) => {
  const { children, modalHeader, trigger, ...restProps } = props

  return (
    <div {...restProps}>
      <Dialog.Root defaultOpen>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={s.overlay} />
          <Dialog.Content className={s.content}>
            <div className={s.header}>
              <Dialog.Title className={s.title}>
                <Typography as={'span'} variant={'h3'}>
                  {modalHeader}
                </Typography>
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className={s.closeButton}>
                  <CloseIcon className={s.closeIcon} />
                </button>
              </Dialog.Close>
            </div>
            <div className={s.children}>{children}</div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
