import { Link } from 'react-router-dom'

import PageNotFoundImg from '@/assets/svg/404.svg?react'
import { routes } from '@/common/router'
import { PageTemplate } from '@/components/layouts/pageTemplate/pageTemplate'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './404.module.scss'

export const PageNotFound = () => {
  return (
    <PageTemplate>
      <div className={s.container}>
        <PageNotFoundImg className={s.image} />
        <Typography as={'span'} variant={'body1'}>
          Sorry! Page not found!
        </Typography>
        <Button as={Link} to={routes.private.main}>
          Back to home page
        </Button>
      </div>
    </PageTemplate>
  )
}
