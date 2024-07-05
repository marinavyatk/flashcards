import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'

import ImageIcon from '@/assets/svg/imageIcon.svg?react'
import { handleImgError } from '@/common/commonFunctions'
import {
  addNewCardFormValues,
  updateCardFormValues,
  updateCardSchema,
} from '@/common/formValidation'
import { Button } from '@/components/ui/button'
import { FormInputFileCover } from '@/components/ui/inputFile/inputFileCover/formInputFileCover'
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
  onClose?: () => void
  onFormSubmit: (data: UpdateCardArg) => void
  open?: boolean
  trigger?: ReactNode
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
  const { cardData, cardId, onClose, onFormSubmit, open, trigger } = props
  const [questionCover, setQuestionCover] = useState<string>(cardData?.questionImg || '')
  const [answerCover, setAnswerCover] = useState<string>(cardData?.answerImg || '')
  const {
    control,
    formState: { dirtyFields },
    handleSubmit,
    setValue,
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

  const handleFileChange = (
    newFile: File | undefined,
    cover: string,
    setCover: (cover: string) => void,
    fieldName: string
  ) => {
    if (cover) {
      URL.revokeObjectURL(cover)
    }
    if (!newFile) {
      setCover('')
      setValue(fieldName, undefined, { shouldDirty: true })
    } else {
      setCover(URL.createObjectURL(newFile))
    }
  }

  const handleFormSubmit = (data: addNewCardFormValues) => {
    const updatedKeys = Object.keys(dirtyFields) as keyof (typeof dirtyFields)[]
    const dataKeys = Object.keys(data)
    const preparedData = {}

    dataKeys.forEach(key => {
      if (!updatedKeys.includes(key)) {
        return
      }
      if (data[key] === undefined) {
        preparedData[key] = ''

        return
      }
      preparedData[key] = data[key]
    })
    onFormSubmit({ cardId, ...preparedData })
    onClose?.()
  }

  const handleCancel = () => {
    onClose?.()
  }

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
              onClick={() =>
                handleFileChange(undefined, questionCover, setQuestionCover, 'questionImg')
              }
              type={'button'}
              variant={'secondary'}
            >
              Remove Image
            </Button>
          )}
          <FormInputFileCover
            control={control}
            name={'questionImg'}
            onFileChange={newFile =>
              handleFileChange(newFile, questionCover, setQuestionCover, 'questionImg')
            }
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
              onClick={() => handleFileChange(undefined, answerCover, setAnswerCover, 'answerImg')}
              type={'button'}
              variant={'secondary'}
            >
              Remove Image
            </Button>
          )}
          <FormInputFileCover
            control={control}
            name={'answerImg'}
            onFileChange={newFile =>
              handleFileChange(newFile, answerCover, setAnswerCover, 'answerImg')
            }
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
