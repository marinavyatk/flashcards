import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { saveGradeFormValues, saveGradeSchema } from '@/common/formValidation'
import { BackLink } from '@/components/layouts/backLink/backLink'
import { PageTemplate } from '@/components/layouts/pageTemplate/pageTemplate'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormRadioGroup } from '@/components/ui/radioGroup/formRadioGroup'
import { Typography } from '@/components/ui/typography'
import {
  useGetCardQuery,
  useRetrieveRandomCardQuery,
  useSaveCardGradeMutation,
} from '@/services/cards/cardsApi'
import { useRetrieveDeckQuery } from '@/services/decks/decksApi'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './learnPage.module.scss'

export const LearnPage = () => {
  const [showAnswer, setShowAnswer] = useState(false)
  const navigate = useNavigate()
  const { cardId } = useParams()
  const { data: cardData } = useGetCardQuery({ cardId: cardId ? cardId : '' })
  const deckId = cardData?.deckId
  const { data: deckData } = useRetrieveDeckQuery({ id: deckId ? deckId : '' })
  const { data: randomCardData } = useRetrieveRandomCardQuery({
    deckId: deckData?.id ? deckData?.id : '',
  })
  const [saveGrade] = useSaveCardGradeMutation()
  const handleChangeShowAnswer = () => {
    setShowAnswer(true)
  }
  const { control, handleSubmit, reset } = useForm<saveGradeFormValues>({
    defaultValues: {
      grade: '1',
    },
    mode: 'onChange',
    resolver: zodResolver(saveGradeSchema),
  })

  const onSubmit = (data: saveGradeFormValues) => {
    if (deckId && cardId && randomCardData) {
      saveGrade({ cardId: cardId, deckId: deckId, grade: Number(data.grade) })
      setShowAnswer(false)
      navigate(`/learn/${deckId}/${randomCardData.id}`, { replace: true })
      reset()
    }
  }

  if (!cardData) {
    return
  }

  return (
    <PageTemplate>
      <div className={s.questionPage}>
        <BackLink onClick={() => navigate(-1)}>Back to Cards List</BackLink>
        <div className={s.cardContainer}>
          <Card className={s.questionCard}>
            <Typography as={'h1'} className={s.deckTitle} variant={'large'}>
              Learn &quot;{deckData?.name}&quot;
            </Typography>
            <div className={s.questionContent}>
              <div>
                <Typography as={'span'} variant={'subtitle1'}>
                  Question:{' '}
                </Typography>
                <Typography as={'span'} variant={'body1'}>
                  {cardData.question}
                </Typography>
              </div>
              {cardData.questionImg && <img alt={'Question picture'} src={cardData.questionImg} />}
              <Typography className={s.shots} variant={'body2'}>
                Number of attempts to answer the question: {cardData.shots}
              </Typography>

              {!showAnswer ? (
                <Button fullWidth onClick={handleChangeShowAnswer}>
                  Show answer
                </Button>
              ) : (
                <>
                  <div>
                    <Typography as={'span'} variant={'subtitle1'}>
                      Answer:{' '}
                    </Typography>
                    <Typography as={'span'} variant={'body1'}>
                      {cardData.answer}
                    </Typography>
                  </div>
                  {cardData.answerImg && <img alt={'Answer picture'} src={cardData.answerImg} />}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography as={'span'} className={s.formHeader} variant={'subtitle1'}>
                      Rate yourself:
                    </Typography>
                    <FormRadioGroup
                      control={control}
                      name={'grade'}
                      radioItems={[
                        {
                          label: 'Did not know',
                          restProps: {
                            value: '1',
                          },
                        },
                        {
                          label: 'Forgot',
                          restProps: {
                            value: '2',
                          },
                        },
                        {
                          label: 'A lot of thought',
                          restProps: {
                            value: '3',
                          },
                        },
                        {
                          label: 'Confused',
                          restProps: {
                            value: '4',
                          },
                        },
                        {
                          label: 'Knew the answer',
                          restProps: {
                            value: '5',
                          },
                        },
                      ]}
                    />
                    <Button className={s.nextQuestionButton} fullWidth>
                      Next Question
                    </Button>
                  </form>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </PageTemplate>
  )
}
