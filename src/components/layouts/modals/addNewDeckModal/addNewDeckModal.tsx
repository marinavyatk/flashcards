import { useState } from 'react'
import { useForm } from 'react-hook-form'

import ImageIcon from '@/assets/svg/imageIcon.svg?react'
import { addNewDeckFromValues, addNewDeckSchema } from '@/components/forms/formValidation'
import { FormInputFileCover } from '@/components/ui/InputFileCover/formInputFileCover'
import { Button } from '@/components/ui/button'
import { FormCheckbox } from '@/components/ui/checkbox/formCheckbox'
import { Modal } from '@/components/ui/modal'
import { FormTextField } from '@/components/ui/textField/formTextField'
import { CreateDeckArgs } from '@/services/decks/decks.types'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'

import s from './addNewDeckModal.module.scss'

export type AddNewDeckModalProps = {
  onFormSubmit: (data: addNewDeckFromValues) => void
}
export const AddNewDeckModal = ({ onFormSubmit }: AddNewDeckModalProps) => {
  const [cover, setCover] = useState<string>('')
  const [open, setOpen] = useState(false)
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<addNewDeckFromValues>({
    defaultValues: {
      cover: {} as File,
      isPrivate: true,
      name: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(addNewDeckSchema),
  })

  console.log('AddNewDeckModalErrors', errors)
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
      <form className={s.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <FormTextField control={control} label={'Name Pack'} name={'name'} />
        {cover && <img alt={'Deck Cover'} className={s.deckCover} src={cover} />}
        <FormInputFileCover control={control} name={'cover'} onFileChange={handleFileChange}>
          <ImageIcon /> Upload Image
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
