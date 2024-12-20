import { ComponentPropsWithoutRef } from 'react'

import EditIcon from '@/assets/svg/editIcon.svg?react'

type EditButtonProps = ComponentPropsWithoutRef<'button'>

export const EditButton = (props: EditButtonProps) => {
  return (
    <button aria-label={'Edit deck'} title={'Edit deck'} type={'button'} {...props}>
      <EditIcon />
    </button>
  )
}
