import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './header.module.scss'
import { Button } from '@/components/ui/button'
import logo from '../../utils/images/logo.png'

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(30),
  rememberMe: z.boolean().optional(),
})

export const Header = () => {
  const {
    control,
    // register,
    // handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(loginSchema) })

  console.log('errors: ', errors)

  // const onSubmit = (data: FormValues) => {
  //     console.log(data)
  // }

  const {
    field: {},
  } = useController({
    name: 'rememberMe',
    control,
    defaultValue: false,
  })

  return (
    <header>
      <div className={s.header}>
        <div>
          <div>
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div>
          <Button type="submit">Sing In</Button>
        </div>
      </div>
    </header>
  )
}
