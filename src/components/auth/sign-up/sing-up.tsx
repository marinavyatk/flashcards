import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './sing-up.module.scss'

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

export const SingUp = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(loginSchema) })

  console.log('errors: ', errors)

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  const {
    field: {},
  } = useController({
    name: 'rememberMe',
    control,
    defaultValue: false,
  })

  return (
    <div className={s.formSingUp}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.formBoxSingUp}>
        <h1 className={s.titleSingUp}>Sing Up</h1>
        <div className={s.inputItem}>
          <Input
            register={register}
            controlName={'email'}
            placeholder={'email'}
            variant={'primary'}
            textInput={'Email'}
            width={'348px'}
            errorMessage={errors.email?.message}
          />
        </div>
        <div className={s.inputItem}>
          <Input
            type={'password'}
            register={register}
            controlName={'password'}
            placeholder={'password'}
            variant={'primary'}
            icon={'passwordControl'}
            textInput={'Password'}
            errorMessage={errors.password?.message}
          />
        </div>
        <div className={s.inputItem}>
          <Input
            type={'password'}
            register={register}
            controlName={'password'}
            placeholder={'password'}
            variant={'primary'}
            icon={'passwordControl'}
            textInput={'Confirm Password'}
            errorMessage={errors.password?.message}
          />
        </div>
        <div className={s.buttonItem}>
          <Button type="submit">Sing Up</Button>
        </div>
        <div className={s.alrHaveAcc}>Already have an account?</div>
        <div className={s.singIn}>Sing In</div>
      </form>
    </div>
  )
}
