import { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'

import EditIcon from '@/assets/svg/editIcon.svg?react'
import ImageIcon from '@/assets/svg/imageIcon.svg?react'
import { handleImgError } from '@/common/commonFunctions'
import {
  addNewCardFormValues,
  updateCardFormValues,
  updateCardSchema,
} from '@/components/forms/formValidation'
import { FormInputFileCover } from '@/components/ui/InputFileCover/formInputFileCover'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { FormTextField } from '@/components/ui/textField/formTextField'
import { Typography } from '@/components/ui/typography'
import { useGetCardQuery } from '@/services/cards/cardsApi'
import { Card, UpdateCardArg } from '@/services/cards/cardsTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'

import s from '../modals.module.scss'

export type EditCardModalProps = {
  cardId: string
  onFormSubmit: (data: UpdateCardArg) => void
  triggerText?: string
}
export const EditCardModal = ({ cardId, ...restProps }: EditCardModalProps) => {
  const { data: cardData } = useGetCardQuery({ cardId })

  if (cardData) {
    return <EditCardContent cardData={cardData} cardId={cardId} {...restProps} />
  }
}

type EditCardContentProps = {
  cardData: Card[]
} & EditCardModalProps

export const EditCardContent = (props: EditCardContentProps) => {
  const { cardData, cardId, onFormSubmit, triggerText } = props
  const [questionCover, setQuestionCover] = useState<string>(cardData?.questionImg || '')
  const [answerCover, setAnswerCover] = useState<string>(cardData?.answerImg || '')
  const [open, setOpen] = useState(false)
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<updateCardFormValues>({
    defaultValues: {
      answer: cardData?.answer,
      answerImg: cardData?.answerImg,
      answerVideo: cardData?.answerVideo,
      question: cardData?.question,
      questionImg: cardData?.questionImg,
      questionVideo: cardData?.questionVideo,
    },
    mode: 'onBlur',
    resolver: zodResolver(updateCardSchema),
  })

  console.log('UpdateCardModalErrors', errors)

  const handleQuestionFileChange = (newFile: File | undefined) => {
    if (questionCover) {
      URL.revokeObjectURL(questionCover)
    }
    if (!newFile) {
      setQuestionCover(null)
    } else {
      setQuestionCover(URL.createObjectURL(newFile))
    }
  }
  const handleAnswerFileChange = (newFile: File | undefined) => {
    if (answerCover) {
      URL.revokeObjectURL(answerCover)
    }
    if (!newFile) {
      setAnswerCover(null)
    } else {
      setAnswerCover(URL.createObjectURL(newFile))
    }
  }

  const handleFormSubmit = (data: addNewCardFormValues) => {
    onFormSubmit({ cardId, ...data })
    reset()
    setQuestionCover('')
    setAnswerCover('')
    setOpen(false)
  }
  const handleCancel = () => {
    reset()
    setQuestionCover('')
    setAnswerCover('')
  }

  return (
    <Modal
      modalHeader={'Edit Card'}
      rootProps={{ onOpenChange: setOpen, open: open }}
      trigger={
        <button className={s.triggerButton}>
          <EditIcon /> {triggerText && triggerText}
        </button>
      }
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
          <Button
            className={s.removeCoverButton}
            fullWidth
            onClick={() => handleQuestionFileChange(undefined)}
            type={'button'}
            variant={'secondary'}
          >
            Remove Image
          </Button>
          <FormInputFileCover
            control={control}
            name={'questionImg'}
            onFileChange={handleQuestionFileChange}
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
          <Button
            className={s.removeCoverButton}
            fullWidth
            onClick={() => handleAnswerFileChange(undefined)}
            type={'button'}
            variant={'secondary'}
          >
            Remove Image
          </Button>
          <FormInputFileCover
            control={control}
            name={'answerImg'}
            onFileChange={handleAnswerFileChange}
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
