import { useState } from 'react'
import { useForm } from 'react-hook-form'

import EditIcon from '@/assets/svg/editIcon.svg?react'
import ImageIcon from '@/assets/svg/imageIcon.svg?react'
import { handleImgError } from '@/common/commonFunctions'
import { updateDeckFormValues, updateDeckSchema } from '@/components/forms/formValidation'
import { FormInputFileCover } from '@/components/ui/InputFileCover/formInputFileCover'
import { Button } from '@/components/ui/button'
import { FormCheckbox } from '@/components/ui/checkbox/formCheckbox'
import { Modal } from '@/components/ui/modal'
import { FormTextField } from '@/components/ui/textField/formTextField'
import { Typography } from '@/components/ui/typography'
import { Deck } from '@/services/decks/decks.types'
import { useRetrieveDeckQuery } from '@/services/decks/decksApi'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'

import s from '../modals.module.scss'

export type EditDeckModalProps = {
  id: string
  onFormSubmit: (data: updateDeckFormValues) => void
  triggerText?: string
}
export const EditDeckModal = ({ id, ...restProps }: EditDeckModalProps) => {
  const { data: deckData } = useRetrieveDeckQuery({ id })

  if (deckData) {
    return <EditDeckContent deckData={deckData} id={id} {...restProps} />
  }
}

type EditDeckContentProps = {
  deckData: Deck
} & EditDeckModalProps
export const EditDeckContent = (props: EditDeckContentProps) => {
  const { deckData, id, onFormSubmit, triggerText } = props
  const [cover, setCover] = useState<string>(deckData?.cover || '')
  const [open, setOpen] = useState(false)
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<updateDeckFormValues>({
    defaultValues: {
      cover: deckData?.cover,
      isPrivate: deckData?.isPrivate ?? true,
      name: deckData?.name ?? '',
    },
    mode: 'onBlur',
    resolver: zodResolver(updateDeckSchema),
  })

  console.log('UpdateDeckModalErrors', errors)

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
  const handleFormSubmit = (data: updateDeckFormValues) => {
    if (isDirty) {
      onFormSubmit({ id, ...data })
    }
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
      modalHeader={'Edit Deck'}
      rootProps={{ onOpenChange: setOpen, open: open }}
      trigger={
        <button className={s.triggerButton}>
          <EditIcon /> {triggerText && triggerText}
        </button>
      }
    >
      <form className={s.modalContent} onSubmit={handleSubmit(handleFormSubmit)}>
        <FormTextField control={control} label={'Name Pack'} name={'name'} />
        {cover && (
          <img
            alt={'Deck Cover'}
            className={s.cover}
            onError={() => handleImgError(setCover)}
            src={cover}
          />
        )}
        <div className={s.coverControlBlock}>
          <Button
            className={s.removeCoverButton}
            fullWidth
            onClick={() => handleFileChange(undefined)}
            type={'button'}
            variant={'secondary'}
          >
            Remove Image
          </Button>
          <FormInputFileCover
            className={s.coverInput}
            control={control}
            name={'cover'}
            onFileChange={handleFileChange}
          >
            <ImageIcon />
            <Typography as={'span'} variant={'subtitle2'}>
              Change Image
            </Typography>
          </FormInputFileCover>
        </div>
        <FormCheckbox control={control} label={'Private pack'} name={'isPrivate'} />

        <div className={s.buttonsBlock}>
          <Dialog.Close asChild>
            <Button onClick={handleCancel} type={'button'} variant={'secondary'}>
              Cancel
            </Button>
          </Dialog.Close>
          <Button>Save Changes</Button>
        </div>
      </form>
    </Modal>
  )
}
