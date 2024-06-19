import { useState } from 'react'

import CloseIcon from '@/assets/svg/closeIcon.svg?react'
import * as Toast from '@radix-ui/react-toast'
import { ToastProps } from '@radix-ui/react-toast'
import clsx from 'clsx'

import s from './notification.module.scss'

export type NotificationProps = {
  className?: string
  description?: string
  rootProps?: ToastProps
}
export const Notification = (props: NotificationProps) => {
  const { className, description } = props
  const classNames = clsx(s.toastRoot, className)
  const [open, setOpen] = useState(Boolean(description))

  return (
    <Toast.Provider swipeDirection={'right'}>
      <Toast.Root className={classNames} onOpenChange={setOpen} open={open}>
        <div className={s.header}>
          <Toast.Title className={s.title}>notification</Toast.Title>
          <Toast.Close className={s.closeButton}>
            <CloseIcon />
          </Toast.Close>
        </div>

        <Toast.Description className={s.toastDescription}>{description}</Toast.Description>
      </Toast.Root>
      <Toast.Viewport className={s.toastViewport} />
    </Toast.Provider>
  )
}
