import { ComponentPropsWithoutRef, ReactNode } from 'react'

import CloseIcon from '@/assets/svg/closeIcon.svg?react'
import { Typography } from '@/components/ui/typography'
import * as Dialog from '@radix-ui/react-dialog'
import { DialogContentProps, DialogProps } from '@radix-ui/react-dialog'
import clsx from 'clsx'

import s from './modal.module.scss'

export type ModalProps = {
  contentProps?: DialogContentProps
  modalHeader: string
  rootProps?: DialogProps
  trigger?: ReactNode
} & ComponentPropsWithoutRef<'div'>
export const Modal = (props: ModalProps) => {
  const { children, contentProps, modalHeader, rootProps, trigger, ...restProps } = props

  return (
    <div {...restProps}>
      <Dialog.Root {...rootProps}>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={s.overlay} />
          <Dialog.Content
            {...contentProps}
            aria-describedby={undefined}
            className={clsx(s.content, contentProps?.className)}
          >
            <div className={s.header}>
              <Dialog.Title className={s.title}>
                <Typography as={'span'} variant={'h3'}>
                  {modalHeader}
                </Typography>
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className={s.closeButton} type={'button'}>
                  <CloseIcon className={s.closeIcon} />
                </button>
              </Dialog.Close>
            </div>
            {children}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
