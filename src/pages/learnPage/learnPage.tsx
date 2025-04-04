import { MouseEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { useShowErrors } from '@/common/customHooks/useShowErrors'
import { saveGradeFormValues, saveGradeSchema } from '@/common/formValidation'
import { BackLink } from '@/components/layouts/backLink/backLink'
import { ViewCloserModal } from '@/components/layouts/modals/viewCloserModal/viewCloserModal'
import { PageTemplate } from '@/components/layouts/pageTemplate/pageTemplate'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PageLoader } from '@/components/ui/loader/loader'
import { FormRadioGroup } from '@/components/ui/radioGroup/formRadioGroup'
import { Typography } from '@/components/ui/typography'
import { useRetrieveRandomCardQuery, useSaveCardGradeMutation } from '@/services/cards/cardsApi'
import { Card as RandomCard } from '@/services/cards/cardsTypes'
import { useRetrieveDeckQuery } from '@/services/decks/decksApi'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './learnPage.module.scss'

export const LearnPage = () => {
  const [showAnswer, setShowAnswer] = useState(false)
  const [cardData, setCurrentCard] = useState<RandomCard | undefined>(undefined)
  const navigate = useNavigate()
  const { deckId } = useParams()
  const [saveGrade, { error: saveGradeError, isLoading: isSaveGradeLoading }] =
    useSaveCardGradeMutation()
  const {
    data: deckData,
    error: getDeckError,
    isLoading: isDeckLoading,
  } = useRetrieveDeckQuery({ id: deckId ?? '' }) //this request sent on every question because of invalidate tag "Cards" in saveGrade request
  const {
    data: randomCard,
    error: randomCardError,
    isLoading: isRandomCardLoading,
  } = useRetrieveRandomCardQuery({
    deckId: deckId ?? '',
  })

  const errors = [saveGradeError, randomCardError, getDeckError]

  useShowErrors(errors)

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

  const onSubmit = async (data: saveGradeFormValues) => {
    const newRandomCard = await saveGrade({
      cardId: cardData?.id ?? '',
      deckId: deckData?.id ?? '',
      grade: Number(data.grade),
    })

    setCurrentCard(newRandomCard.data)
    setShowAnswer(false)
    reset()
  }

  const goBack = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    navigate(-1)
  }

  if (isRandomCardLoading || isDeckLoading) {
    return (
      <PageTemplate>
        <PageLoader />
      </PageTemplate>
    )
  }

  if (cardData) {
    return (
      <PageTemplate showTopLoader={isSaveGradeLoading}>
        <div className={s.questionPage}>
          <BackLink onClick={goBack} to={'..'}>
            Back to Previous Page
          </BackLink>
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
                {cardData.questionImg && (
                  <ViewCloserModal
                    imgSrc={cardData.questionImg}
                    triggerImgProps={{ className: s.image }}
                  />
                )}
                <Typography className={s.shots} variant={'body2'}>
                  Number of attempts to answer the question:&nbsp;{cardData.shots}
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
                    {cardData.answerImg && (
                      <ViewCloserModal
                        imgSrc={cardData.answerImg}
                        triggerImgProps={{ className: s.image }}
                      />
                    )}
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
                      <Button
                        className={s.nextQuestionButton}
                        disabled={isSaveGradeLoading}
                        fullWidth
                      >
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
}
