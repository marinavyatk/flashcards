import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { handleFileChange } from '@/common/commonFunctions'
import { addNewCardFormValues, addNewCardSchema } from '@/common/formValidation'
import { CoverControl } from '@/components/layouts/modals/coverControl'
import { ViewCloserModal } from '@/components/layouts/modals/viewCloserModal/viewCloserModal'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { FormTextArea } from '@/components/ui/textarea/formTextArea'
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
  const { control, handleSubmit, reset, setValue } = useForm<addNewCardFormValues>({
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

  const handleChangeQuestionCover = (newFile: File | undefined) => {
    handleFileChange({
      cover: questionCover,
      newFile: newFile,
      setCover: setQuestionCover,
    })
  }

  const handleRemoveQuestionCover = () =>
    handleFileChange({
      cover: questionCover,
      fieldName: 'questionImg',
      newFile: undefined,
      setCover: setQuestionCover,
      setValue,
    })

  const handleChangeAnswerCover = (newFile: File | undefined) => {
    handleFileChange({
      cover: answerCover,
      newFile: newFile,
      setCover: setAnswerCover,
    })
  }

  const handleRemoveAnswerCover = () =>
    handleFileChange({
      cover: answerCover,
      fieldName: 'answerImg',
      newFile: undefined,
      setCover: setAnswerCover,
      setValue,
    })

  const handleFormSubmit = (data: addNewCardFormValues) => {
    onFormSubmit(data)
    setOpen(false)
  }

  const cleanForm = () => {
    reset()
    setQuestionCover('')
    setAnswerCover('')
  }

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    if (open) {
      cleanForm()
    }
  }

  return (
    <Modal
      modalHeader={'Add New Card'}
      rootProps={{
        onOpenChange: handleOpenChange,
        open: open,
      }}
      trigger={<Button>Add New Card</Button>}
    >
      <form className={s.modalContent} onSubmit={handleSubmit(handleFormSubmit)}>
        <FormTextArea control={control} label={'Question'} name={'question'} />
        {questionCover && (
          <ViewCloserModal
            imgSrc={questionCover}
            triggerImgProps={{ alt: 'Question Cover', className: s.cover }}
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
            triggerImgProps={{ alt: 'Answer Cover', className: s.cover }}
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
            <Button type={'button'} variant={'secondary'}>
              Cancel
            </Button>
          </Dialog.Close>
          <Button>Add New Card</Button>
        </div>
      </form>
    </Modal>
  )
}
