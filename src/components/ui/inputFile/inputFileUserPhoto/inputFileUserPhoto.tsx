import EditIcon from '@/assets/svg/editIcon.svg?react'
import { InputFile, InputFileProps } from '@/components/ui/inputFile'

import s from './inputFileUserPhoto.module.scss'

export const InputFileUserPhoto = (props: InputFileProps) => {
  return (
    <InputFile accept={'image/*'} {...props} labelProps={{ className: s.label }}>
      <EditIcon />
    </InputFile>
  )
}
