import {useController, useForm} from 'react-hook-form'
import {z} from 'zod'
import {Button} from '../../ui/button'
import {Input} from '../../ui/input'
import {CheckboxComponent} from '@/components/ui/checkbox'
import {zodResolver} from '@hookform/resolvers/zod'
import s from './sing-in.module.scss'

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

export const SingIn = () => {
    const {
        control,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormValues>({resolver: zodResolver(loginSchema)})

    console.log('errors: ', errors)

    const onSubmit = (data: FormValues) => {
        console.log(data)
    }

    const {
        field: {value, onChange},
    } = useController({
        name: 'rememberMe',
        control,
        defaultValue: false,
    })

    return (
        <div className={s.formSingIn}>
            <form onSubmit={handleSubmit(onSubmit)} className={s.formBoxSingIn}>
                <h1 className={s.titleSingIn}>Sing In</h1>
                <div className={s.inputItem}>
                    <Input
                        fullWidth={true}
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
                        fullWidth={true}
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
                <div className={s.checkboxItem}>
                    <CheckboxComponent
                        onCheckedChange={onChange}
                        checked={value}
                        checkboxTitle={'Remember me'}
                    />
                    <div className={s.forgotPassword}>Forgot Password?</div>
                </div>
                <div className={s.buttonItem}>
                    <Button type="submit" fullWidth={true}>Sing In</Button>
                </div>
                <div className={s.dntHaveAcc}>Don't have an account?</div>
                <div className={s.singUp}>Sing Up</div>
            </form>
        </div>
    )
}
