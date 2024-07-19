import Logo from '@/assets/logo.png'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from '../newAccountEmail/newAccountEmail.module.scss'

export const PasswordRecoveryEmail = () => {
  return (
    <div className={s.background}>
      <Card className={s.card}>
        <Typography as={'h1'} variant={'h1'}>
          Hello, ##name## !
        </Typography>
        <img className={s.logo} src={Logo} />
        <Typography>
          Click here to recover your password. If this wasn't you, please ignore this message.
        </Typography>
        <Button
          as={'a'}
          className={s.confirmButton}
          fullWidth
          href={'http://localhost:3000/create-new-password/##token##'}
        >
          Recover password
        </Button>
      </Card>
    </div>
  )
}
