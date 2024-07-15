import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

import ImageIcon from '@/assets/svg/imageIcon.svg?react'
import { handleFileChange, handleImgError, prepareData } from '@/common/commonFunctions'
import { updateDeckFormValues, updateDeckSchema } from '@/common/formValidation'
import { Button } from '@/components/ui/button'
import { FormCheckbox } from '@/components/ui/checkbox/formCheckbox'
import { FormInputFileCover } from '@/components/ui/inputFile/inputFileCover/formInputFileCover'
import { Modal } from '@/components/ui/modal'
import { FormTextField } from '@/components/ui/textField/formTextField'
import { Typography } from '@/components/ui/typography'
import { Deck, UpdateDeckArgs } from '@/services/decks/decks.types'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'

import s from '../modals.module.scss'

export type EditDeckModalProps = {
  deckData: Deck
  onClose?: () => void
  onFormSubmit: (data: UpdateDeckArgs) => void
  open?: boolean
  trigger?: ReactNode
}
export const EditDeckModal = (props: EditDeckModalProps) => {
  const { deckData, onClose, onFormSubmit, open, trigger } = props
  const [cover, setCover] = useState<string>(deckData?.cover || '')

  const {
    control,
    formState: { dirtyFields, isDirty },
    handleSubmit,
    setValue,
  } = useForm<updateDeckFormValues>({
    defaultValues: {
      cover: deckData?.cover,
      isPrivate: deckData?.isPrivate ?? true,
      name: deckData?.name ?? '',
    },
    mode: 'onBlur',
    resolver: zodResolver(updateDeckSchema),
  })

  const handleRemoveCover = () => handleFileChange(undefined, cover, setCover, 'cover', setValue)

  const handleChangeCover = newFile => handleFileChange(newFile, cover, setCover, 'cover', setValue)

  const handleFormSubmit = (data: updateDeckFormValues) => {
    const preparedData = prepareData(data, dirtyFields)

    isDirty && onFormSubmit({ ...preparedData, id: deckData.id })
    onClose?.()
  }
  const handleCancel = () => {
    onClose?.()
  }

  return (
    <Modal
      modalHeader={'Edit Deck'}
      rootProps={{
        onOpenChange: callbackValue => {
          if (!callbackValue) {
            onClose?.()
          }
        },
        open: open,
      }}
      trigger={trigger}
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
          <FormInputFileCover control={control} name={'cover'} onFileChange={handleChangeCover}>
            <ImageIcon />
            <Typography as={'span'} variant={'subtitle2'}>
              {cover ? 'Change Image' : 'Upload Image'}
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
