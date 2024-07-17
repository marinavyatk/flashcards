import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'

import ImageIcon from '@/assets/svg/imageIcon.svg?react'
import { handleFileChange, handleImgError, prepareData } from '@/common/commonFunctions'
import { updateCardFormValues, updateCardSchema } from '@/common/formValidation'
import { Button } from '@/components/ui/button'
import { FormInputFileCover } from '@/components/ui/inputFile/inputFileCover/formInputFileCover'
import { Modal } from '@/components/ui/modal'
import { FormTextField } from '@/components/ui/textField/formTextField'
import { Typography } from '@/components/ui/typography'
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
    handleFileChange(undefined, questionCover, setQuestionCover, 'questionImg', setValue)

  const handleRemoveAnswerCover = () =>
    handleFileChange(undefined, answerCover, setAnswerCover, 'answerImg', setValue)

  const handleChangeQuestionCover = (newFile: File | undefined) =>
    handleFileChange(newFile, questionCover, setQuestionCover, 'questionImg', setValue)

  const handleChangeAnswerCover = (newFile: File | undefined) =>
    handleFileChange(newFile, answerCover, setAnswerCover, 'answerImg', setValue)

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
        <FormTextField
          as={TextareaAutosize}
          control={control}
          label={'Question'}
          name={'question'}
        />
        {questionCover && (
          <img
            alt={'Question Cover'}
            className={s.cover}
            onError={() => handleImgError(setQuestionCover)}
            src={questionCover}
          />
        )}
        <div className={s.coverControlBlock}>
          {questionCover && (
            <Button
              className={s.removeCoverButton}
              fullWidth
              onClick={handleRemoveQuestionCover}
              type={'button'}
              variant={'secondary'}
            >
              Remove Image
            </Button>
          )}
          <FormInputFileCover
            control={control}
            name={'questionImg'}
            onFileChange={handleChangeQuestionCover}
          >
            <ImageIcon />
            <Typography as={'span'} variant={'subtitle2'}>
              {questionCover ? 'Change Image' : 'Upload Image'}
            </Typography>
          </FormInputFileCover>
        </div>

        <FormTextField as={TextareaAutosize} control={control} label={'Answer'} name={'answer'} />
        {answerCover && (
          <img
            alt={'Deck Cover'}
            className={s.cover}
            onError={() => handleImgError(setAnswerCover)}
            src={answerCover}
          />
        )}
        <div className={s.coverControlBlock}>
          {answerCover && (
            <Button
              className={s.removeCoverButton}
              fullWidth
              onClick={handleRemoveAnswerCover}
              type={'button'}
              variant={'secondary'}
            >
              Remove Image
            </Button>
          )}
          <FormInputFileCover
            control={control}
            name={'answerImg'}
            onFileChange={handleChangeAnswerCover}
          >
            <ImageIcon />
            <Typography as={'span'} variant={'subtitle2'}>
              {answerCover ? 'Change Image' : 'Upload Image'}
            </Typography>
          </FormInputFileCover>
        </div>
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
