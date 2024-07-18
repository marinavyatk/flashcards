import RatingStar from '@/assets/svg/ratingStar.svg?react'
import RatingStarEmpty from '@/assets/svg/ratingStarEmpty.svg?react'

import s from './rating.module.scss'

type RatingProps = {
  cardId: string
  grade: number
}
export const Rating = (props: RatingProps) => {
  const { cardId, grade } = props
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className={s.grade}>
      {stars.map(star => {
        if (grade >= star) {
          return <RatingStar key={star + cardId} />
        }

        return <RatingStarEmpty key={star + cardId} />
      })}
    </div>
  )
}
