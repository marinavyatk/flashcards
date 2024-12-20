import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import PlayIcon from '@/assets/svg/playIcon.svg?react'
import { clsx } from 'clsx'

import s from '@/components/layouts/appTable/actions/actions.module.scss'

type LearnButtonProps = {
  deckId: string
  isDeckEmpty: boolean
} & ComponentPropsWithoutRef<'button'>

export const LearnButton = (props: LearnButtonProps) => {
  const { deckId, isDeckEmpty } = props
  const learnDeckTitle = isDeckEmpty
    ? 'You need to have at least one card to learn the deck'
    : 'Learn deck'

  return (
    <>
      {isDeckEmpty ? (
        <button
          aria-label={'Learn deck'}
          className={clsx(isDeckEmpty && s.disabled)}
          title={learnDeckTitle}
          type={'button'}
        >
          <PlayIcon />
        </button>
      ) : (
        <Link title={learnDeckTitle} to={`/decks/${deckId}/learn`}>
          <PlayIcon />
        </Link>
      )}
    </>
  )
}
