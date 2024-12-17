import { ComponentPropsWithoutRef } from 'react'

import { Modal } from '@/components/ui/modal'
import { Picture } from '@/components/ui/picture'

import s from '../modals.module.scss'

type ViewCloserModalProps = {
  imgSrc: string
  triggerImgProps?: ComponentPropsWithoutRef<'img'>
}
export const ViewCloserModal = (props: ViewCloserModalProps) => {
  const { imgSrc, triggerImgProps } = props

  return (
    <Modal
      contentProps={{ className: s.modalContainer }}
      modalHeader={'View image'}
      trigger={
        <button className={s.triggerContainer} type={'button'}>
          <Picture
            {...triggerImgProps}
            containerProps={{ className: triggerImgProps?.className }}
            src={imgSrc}
          />
        </button>
      }
    >
      <div className={s.imgContainer}>
        <img alt={'View image'} className={s.imgCloser} src={imgSrc} />
      </div>
    </Modal>
  )
}
