import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { CheckboxComponent } from '@/components/ui/checkbox'
import { zodResolver } from '@hookform/resolvers/zod'

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

export const LoginForm = () => {
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
    field: { value, onChange },
  } = useController({
    name: 'rememberMe',
    control,
    defaultValue: false,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        register={register}
        controlName={'email'}
        placeholder={'email'}
        variant={'primary'}
        textInput={'Email'}
        errorMessage={errors.email?.message}
      />
      <Input
        register={register}
        controlName={'password'}
        placeholder={'password'}
        variant={'primary'}
        textInput={'Password'}
        errorMessage={errors.password?.message}
      />
      <CheckboxComponent onCheckedChange={onChange} checked={value} checkboxTitle={'Remember me'} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
