import { ComponentPropsWithoutRef } from 'react'

import BinIcon from '@/assets/svg/binIcon.svg?react'

type DeleteButtonProps = ComponentPropsWithoutRef<'button'>

export const DeleteButton = (props: DeleteButtonProps) => {
  return (
    <button aria-label={'Delete deck'} title={'Delete deck'} type={'button'} {...props}>
      <BinIcon />
    </button>
  )
}
