import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { handleFileChange, handleTextChange } from '@/common/commonFunctions'
import { addNewDeckFromValues, addNewDeckSchema } from '@/common/formValidation'
import { CoverControl } from '@/components/layouts/modals/coverControl'
import { ViewCloserModal } from '@/components/layouts/modals/viewCloserModal/viewCloserModal'
import { Button } from '@/components/ui/button'
import { FormCheckbox } from '@/components/ui/checkbox/formCheckbox'
import { Modal } from '@/components/ui/modal'
import { FormTextField } from '@/components/ui/textField/formTextField'
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
  const { clearErrors, control, handleSubmit, reset, setError, setValue } =
    useForm<addNewDeckFromValues>({
      defaultValues: {
        cover: undefined,
        isPrivate: true,
        name: '',
      },
      mode: 'onBlur',
      resolver: zodResolver(addNewDeckSchema),
    })

  const handleChangeCover = (newFile: File | undefined) => {
    handleFileChange({ cover, newFile, setCover })
  }

  const handleRemoveCover = () =>
    handleFileChange({ cover, fieldName: 'cover', newFile: undefined, setCover, setValue })

  const handleFormSubmit = (data: CreateDeckArgs) => {
    onFormSubmit(data)
    reset()
    setCover('')
    setOpen(false)
  }
  const handleValueChange = (value: string) => {
    handleTextChange(value, 30, 'name', setError, clearErrors)
  }

  return (
    <Modal
      modalHeader={'Add New Deck'}
      rootProps={{
        onOpenChange: open => {
          reset()
          setCover('')
          setOpen(open)
        },
        open: open,
      }}
      trigger={<Button>Add New Deck</Button>}
    >
      <form className={s.modalContent} onSubmit={handleSubmit(handleFormSubmit)}>
        <FormTextField
          control={control}
          label={'Name Pack'}
          name={'name'}
          onValueChange={handleValueChange}
        />
        {cover && (
          <ViewCloserModal
            imgSrc={cover}
            triggerImgProps={{ alt: 'Deck Cover', className: s.cover }}
          />
        )}
        <CoverControl
          control={control}
          cover={cover}
          handleChangeCover={handleChangeCover}
          handleRemoveCover={handleRemoveCover}
          name={'cover'}
        />
        <FormCheckbox control={control} label={'Private pack'} name={'isPrivate'} />
        <div className={s.buttonsBlock}>
          <Dialog.Close asChild>
            <Button type={'button'} variant={'secondary'}>
              Cancel
            </Button>
          </Dialog.Close>
          <Button>Add New Pack</Button>
        </div>
      </form>
    </Modal>
  )
}
