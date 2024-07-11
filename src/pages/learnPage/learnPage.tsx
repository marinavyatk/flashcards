import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

import { saveGradeFormValues, saveGradeSchema } from '@/common/formValidation'
import { BackLink } from '@/components/layouts/backLink/backLink'
import { PageTemplate } from '@/components/layouts/pageTemplate/pageTemplate'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormRadioGroup } from '@/components/ui/radioGroup/formRadioGroup'
import { Typography } from '@/components/ui/typography'
import { useRetrieveRandomCardQuery, useSaveCardGradeMutation } from '@/services/cards/cardsApi'
import { Card as RandomCard } from '@/services/cards/cardsTypes'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './learnPage.module.scss'

export const LearnPage = () => {
  const [showAnswer, setShowAnswer] = useState(false)
  const [cardData, setCurrentCard] = useState<RandomCard | undefined>(undefined)
  const navigate = useNavigate()
  const { state } = useLocation()
  const { deckData } = state
  const [saveGrade] = useSaveCardGradeMutation()
  const { data: randomCard } = useRetrieveRandomCardQuery({
    deckId: deckData?.id ? deckData?.id : '',
  })
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

  if (randomCard && !cardData) {
    setCurrentCard(randomCard)
  }

  if (!cardData) {
    return
  }

  const onSubmit = async (data: saveGradeFormValues) => {
    const newRandomCard = await saveGrade({
      cardId: cardData?.id ?? '',
      deckId: deckData?.id,
      grade: Number(data.grade),
    })

    setCurrentCard(newRandomCard.data)
    setShowAnswer(false)
    reset()
  }

  return (
    <PageTemplate>
      <div className={s.questionPage}>
        <BackLink onClick={() => navigate(-1)}>Back to Previous Page</BackLink>
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
