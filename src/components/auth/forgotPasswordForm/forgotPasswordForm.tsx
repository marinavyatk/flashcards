import {useForm} from 'react-hook-form'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Typography} from '@/components/ui/typography'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'

import s from './forgotPasswordForm.module.css'

const emailSchema = z.object({
    email: z.string().email(),
})

export type FormValues = z.infer<typeof emailSchema>
export const ForgotPasswordForm = () => {
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
            {/* div`ll be replaced by card component*/}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography className={s.formHeader} variant={'large'}>
                    Forgot your password?
                </Typography>
                {/*<Typography variant={'body2'}>Email</Typography>*/}
                {/*<input {...register('email')} />*/}
                <Input
                    variant={'primary'}
                    controlName={'email'}
                    errorMessage={errors.email?.message}
                    placeholder={'Type your email'}
                    register={register}
                    {...register('email')}
                    className={s.input}
                    textInput={'Email'}
                />

                <Typography className={s.instruction} variant={'body2'}>
                    Enter your email address and we will send you further instructions{' '}
                </Typography>
                <Button fullWidth>Send Instructions</Button>
                <Typography className={s.footerText} variant={'body2'}>
                    Did you remember your password?
                </Typography>
                <Button as={'a'} className={s.submitButton} type={'submit'} variant={'link'}>
                    Try logging in
                </Button>
            </form>
        </div>
    )
}
