import { useState } from 'react'
import { useForm } from 'react-hook-form'

import ImageIcon from '@/assets/svg/imageIcon.svg?react'
import { addNewDeckFromValues, addNewDeckSchema } from '@/common/formValidation'
import { Button } from '@/components/ui/button'
import { FormCheckbox } from '@/components/ui/checkbox/formCheckbox'
import { FormInputFileCover } from '@/components/ui/inputFile/inputFileCover/formInputFileCover'
import { Modal } from '@/components/ui/modal'
import { FormTextField } from '@/components/ui/textField/formTextField'
import { Typography } from '@/components/ui/typography'
import { CreateDeckArgs } from '@/services/decks/decks.types'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'

import s from '../modals.module.scss'

export type AddNewDeckModalProps = {
  onFormSubmit: (data: addNewDeckFromValues) => void
}
export const AddNewDeckModal = ({ onFormSubmit }: AddNewDeckModalProps) => {
  const [cover, setCover] = useState<string>('')
  const [open, setOpen] = useState(false)
  const { control, handleSubmit, reset } = useForm<addNewDeckFromValues>({
    defaultValues: {
      cover: {} as File,
      isPrivate: true,
      name: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(addNewDeckSchema),
  })
  const handleFileChange = (newFile: File | undefined) => {
    if (cover) {
      URL.revokeObjectURL(cover)
    }

    if (!newFile) {
      setCover('')
    } else {
      setCover(URL.createObjectURL(newFile))
    }
  }
  const handleFormSubmit = (data: CreateDeckArgs) => {
    onFormSubmit(data)
    reset()
    setCover('')
    setOpen(false)
  }
  const handleCancel = () => {
    reset()
    setCover('')
  }

  return (
    <Modal
      modalHeader={'Add New Deck'}
      rootProps={{ onOpenChange: setOpen, open: open }}
      trigger={<Button>Add New Deck</Button>}
    >
      <form className={s.modalContent} onSubmit={handleSubmit(handleFormSubmit)}>
        <FormTextField control={control} label={'Name Pack'} name={'name'} />
        {cover && <img alt={'Deck Cover'} className={s.cover} src={cover} />}
        <FormInputFileCover control={control} name={'cover'} onFileChange={handleFileChange}>
          <ImageIcon />
          <Typography as={'span'} variant={'subtitle2'}>
            Upload Image
          </Typography>
        </FormInputFileCover>
        <FormCheckbox control={control} label={'Private pack'} name={'isPrivate'} />
        <div className={s.buttonsBlock}>
          <Dialog.Close asChild>
            <Button onClick={handleCancel} type={'button'} variant={'secondary'}>
              Cancel
            </Button>
          </Dialog.Close>
          <Button>Add New Pack</Button>
        </div>
      </form>
    </Modal>
  )
}
