import { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'

import ImageIcon from '@/assets/svg/imageIcon.svg?react'
import { addNewCardFormValues, addNewCardSchema } from '@/common/formValidation'
import { Button } from '@/components/ui/button'
import { FormInputFileCover } from '@/components/ui/inputFile/inputFileCover/formInputFileCover'
import { Modal } from '@/components/ui/modal'
import { FormTextField } from '@/components/ui/textField/formTextField'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'

import s from '../modals.module.scss'

export type AddNewCardModalProps = {
  onFormSubmit: (data: addNewCardFormValues) => void
}
export const AddNewCardModal = ({ onFormSubmit }: AddNewCardModalProps) => {
  const [questionCover, setQuestionCover] = useState<string>('')
  const [answerCover, setAnswerCover] = useState<string>('')
  const [open, setOpen] = useState(false)
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<addNewCardFormValues>({
    defaultValues: {
      answer: '',
      answerImg: undefined,
      question: '',
      questionImg: undefined,
    },
    mode: 'onBlur',
    resolver: zodResolver(addNewCardSchema),
    shouldUnregister: true,
  })

  console.log('AddNewCardModalErrors', errors)

  const handleQuestionFileChange = (newFile: File | undefined) => {
    if (questionCover) {
      URL.revokeObjectURL(questionCover)
    }
    if (!newFile) {
      setQuestionCover('')
    } else {
      setQuestionCover(URL.createObjectURL(newFile))
    }
  }
  const handleAnswerFileChange = (newFile: File | undefined) => {
    if (answerCover) {
      URL.revokeObjectURL(answerCover)
    }
    if (!newFile) {
      setAnswerCover('')
    } else {
      setAnswerCover(URL.createObjectURL(newFile))
    }
  }

  const handleFormSubmit = (data: addNewCardFormValues) => {
    onFormSubmit(data)
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
      modalHeader={'Add New Card'}
      rootProps={{ onOpenChange: setOpen, open: open }}
      trigger={<Button>Add New Card</Button>}
    >
      <form className={s.modalContent} onSubmit={handleSubmit(handleFormSubmit)}>
        <FormTextField
          as={TextareaAutosize}
          control={control}
          label={'Question'}
          name={'question'}
        />
        {questionCover && <img alt={'Question Cover'} className={s.cover} src={questionCover} />}
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

        <FormTextField as={TextareaAutosize} control={control} label={'Answer'} name={'answer'} />
        {answerCover && <img alt={'Deck Cover'} className={s.cover} src={answerCover} />}
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

        <div className={s.buttonsBlock}>
          <Dialog.Close asChild>
            <Button onClick={handleCancel} type={'button'} variant={'secondary'}>
              Cancel
            </Button>
          </Dialog.Close>
          <Button>Add New Card</Button>
        </div>
      </form>
    </Modal>
  )
}
