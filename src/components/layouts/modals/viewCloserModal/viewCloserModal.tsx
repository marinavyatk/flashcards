import { ReactNode } from 'react'

import { Modal } from '@/components/ui/modal'

import s from '../modals.module.scss'

type ViewCloserModalProps = {
  imgSrc: string
  trigger?: ReactNode
}
export const ViewCloserModal = (props: ViewCloserModalProps) => {
  const { imgSrc, trigger } = props

  return (
    <Modal
      contentProps={{ className: s.modalContainer }}
      modalHeader={'View image'}
      trigger={trigger}
    >
      <div className={s.imgContainer}>
        <img alt={'View image'} className={s.imgCloser} src={imgSrc} />
      </div>
    </Modal>
  )
}
