import ImageIcon from '@/assets/svg/imageIcon.svg?react'
import { Button } from '@/components/ui/button'
import { FormInputFileCover } from '@/components/ui/inputFile/inputFileCover/formInputFileCover'
import { Typography } from '@/components/ui/typography'

import s from '@/components/layouts/modals/modals.module.scss'

type CoverControlProps = {
  control: any
  cover: string
  handleChangeCover: (newFile: File | undefined) => void
  handleRemoveCover: () => void
  name: string
}

export const CoverControl = (props: CoverControlProps) => {
  const { control, cover, handleChangeCover, handleRemoveCover, name } = props

  return (
    <div className={s.coverControlBlock}>
      {cover && (
        <Button
          className={s.removeCoverButton}
          fullWidth
          onClick={handleRemoveCover}
          type={'button'}
          variant={'secondary'}
        >
          Remove Image
        </Button>
      )}
      <FormInputFileCover control={control} name={name} onFileChange={handleChangeCover}>
        <ImageIcon />
        <Typography as={'span'} variant={'subtitle2'}>
          {cover ? 'Change Image' : 'Upload Image'}
        </Typography>
      </FormInputFileCover>
    </div>
  )
}
