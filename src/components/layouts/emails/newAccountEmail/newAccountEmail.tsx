import Logo from '@/assets/logo.png'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './newAccountEmail.module.scss'

export const NewAccountEmail = () => {
  return (
    <div className={s.background}>
      <Card className={s.card}>
        <Typography as={'h1'} variant={'h1'}>
          Hello, ##name## !
        </Typography>
        <img className={s.logo} src={Logo} />
        <Typography>
          Welcome! You have just filled out the registration form on{' '}
          <a href={'http://localhost:3000/'} rel={'noreferrer'} target={'_blank'}>
            FlashCards
          </a>
          . Please confirm your email by clicking on the link below:
          <br />
          <Button
            as={'a'}
            className={s.confirmButton}
            fullWidth
            href={'http://localhost:3000/confirm-email/##token##'}
            target={'_blank'}
          >
            Confirm Email
          </Button>
          If it doesn't work, copy and paste the following link in your browser:
          <br />
          <Typography className={s.confirmLink} variant={'subtitle1'}>
            {`http://localhost:3000/confirm-email/##token##`}
          </Typography>
        </Typography>
      </Card>
    </div>
  )
}
