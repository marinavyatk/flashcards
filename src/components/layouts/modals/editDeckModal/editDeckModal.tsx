import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

import { handleFileChange, handleImgError, prepareData } from '@/common/commonFunctions'
import { updateDeckFormValues, updateDeckSchema } from '@/common/formValidation'
import { CoverControl } from '@/components/layouts/modals/coverControl'
import { ViewCloserModal } from '@/components/layouts/modals/viewCloserModal/viewCloserModal'
import { Button } from '@/components/ui/button'
import { FormCheckbox } from '@/components/ui/checkbox/formCheckbox'
import { Modal } from '@/components/ui/modal'
import { FormTextField } from '@/components/ui/textField/formTextField'
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

  const handleRemoveCover = () =>
    handleFileChange({ cover, fieldName: 'cover', newFile: undefined, setCover, setValue })

  const handleChangeCover = (newFile: File | undefined) =>
    handleFileChange({ cover, fieldName: 'cover', newFile, setCover, setValue })

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
          <ViewCloserModal
            imgSrc={cover}
            triggerImgProps={{
              alt: 'Deck Cover',
              className: s.cover,
              onError: () => handleImgError(setCover),
            }}
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
