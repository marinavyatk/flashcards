import {useForm} from 'react-hook-form'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Typography} from '@/components/ui/typography'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'

import s from './createNewPassword.module.css'

const emailSchema = z.object({
    email: z.string().email(),
})

export type FormValues = z.infer<typeof emailSchema>
export const CreateNewPassword = () => {
    const {
        control,
        formState: {errors},
        handleSubmit,
        register,
    } = useForm<FormValues>({
        defaultValues: {email: ''},
        resolver: zodResolver(emailSchema),
    })
    const onSubmit = (data: FormValues) => {
        console.log(data)
    }

    return (
        <div className={s.card}>
            {' '}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography className={s.formHeader} variant={'large'}>
                    Create new password
                </Typography>
                <Input
                    type={'password'}
                    variant={'primary'}
                    controlName={'email'}
                    errorMessage={errors.email?.message}
                    placeholder={'Type new password'}
                    register={register}
                    className={s.input}
                    textInput={'Password'}
                    icon={'passwordControl'}
                />
                <Typography className={s.instruction} variant={'body2'}>
                    Create new password and we will send you further instructions to email{' '}
                </Typography>
                <Button fullWidth className={s.button}>Create New Password</Button>
            </form>
        </div>
    )
}
