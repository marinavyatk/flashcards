import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

import { handleFileChange, handleImgError, prepareData } from '@/common/commonFunctions'
import { updateCardFormValues, updateCardSchema } from '@/common/formValidation'
import { CoverControl } from '@/components/layouts/modals/coverControl'
import { ViewCloserModal } from '@/components/layouts/modals/viewCloserModal/viewCloserModal'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { FormTextArea } from '@/components/ui/textarea/formTextArea'
import { Card, UpdateCardArg } from '@/services/cards/cardsTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'

import s from '../modals.module.scss'

export type EditCardModalProps = {
  cardData: Card
  onClose?: () => void
  onFormSubmit: (data: UpdateCardArg) => void
  open?: boolean
  trigger?: ReactNode
}
export const EditCardModal = (props: EditCardModalProps) => {
  const { cardData, onClose, onFormSubmit, open, trigger } = props
  const [questionCover, setQuestionCover] = useState<string>(cardData?.questionImg || '')
  const [answerCover, setAnswerCover] = useState<string>(cardData?.answerImg || '')
  const {
    control,
    formState: { dirtyFields, isDirty },
    handleSubmit,
    setValue,
  } = useForm<updateCardFormValues>({
    defaultValues: {
      answer: cardData?.answer,
      answerImg: cardData?.answerImg,
      question: cardData?.question,
      questionImg: cardData?.questionImg,
    },
    mode: 'onBlur',
    resolver: zodResolver(updateCardSchema),
  })

  const handleFormSubmit = (data: updateCardFormValues) => {
    const preparedData = prepareData(data, dirtyFields)

    isDirty && onFormSubmit({ cardId: cardData?.id, ...preparedData })
    onClose?.()
  }

  const handleCancel = () => {
    onClose?.()
  }

  const handleRemoveQuestionCover = () =>
    handleFileChange({
      cover: questionCover,
      fieldName: 'questionImg',
      newFile: undefined,
      setCover: setQuestionCover,
      setValue,
    })

  const handleRemoveAnswerCover = () =>
    handleFileChange({
      cover: answerCover,
      fieldName: 'answerImg',
      newFile: undefined,
      setCover: setAnswerCover,
      setValue,
    })

  const handleChangeQuestionCover = (newFile: File | undefined) =>
    handleFileChange({
      cover: questionCover,
      fieldName: 'questionImg',
      newFile,
      setCover: setQuestionCover,
      setValue,
    })

  const handleChangeAnswerCover = (newFile: File | undefined) =>
    handleFileChange({
      cover: answerCover,
      fieldName: 'answerImg',
      newFile,
      setCover: setAnswerCover,
      setValue,
    })

  return (
    <Modal
      modalHeader={'Edit Card'}
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
        <FormTextArea control={control} label={'Question'} name={'question'} />
        {questionCover && (
          <ViewCloserModal
            imgSrc={questionCover}
            triggerImgProps={{
              alt: 'Question Cover',
              className: s.cover,
              onError: () => handleImgError(setQuestionCover),
            }}
          />
        )}
        <CoverControl
          control={control}
          cover={questionCover}
          handleChangeCover={handleChangeQuestionCover}
          handleRemoveCover={handleRemoveQuestionCover}
          name={'questionImg'}
        />
        <FormTextArea control={control} label={'Answer'} name={'answer'} />
        {answerCover && (
          <ViewCloserModal
            imgSrc={answerCover}
            triggerImgProps={{
              alt: 'Answer Cover',
              className: s.cover,
              onError: () => handleImgError(setAnswerCover),
            }}
          />
        )}
        <CoverControl
          control={control}
          cover={answerCover}
          handleChangeCover={handleChangeAnswerCover}
          handleRemoveCover={handleRemoveAnswerCover}
          name={'answerImg'}
        />
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
