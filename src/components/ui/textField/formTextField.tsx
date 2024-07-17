import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/components/ui/textField/textField'

export type FormTextFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'id' | 'onChange' | 'value'
> &
  UseControllerProps<T>
export const FormTextField = <T extends FieldValues>(props: FormTextFieldProps<T>) => {
  const { control, defaultValue, name, rules, shouldUnregister, ...textFieldProps } = props
  const {
    field,
    fieldState: { error },
  } = useController({ control, defaultValue, name, rules, shouldUnregister })

  return <TextField {...textFieldProps} errorMessage={error?.message} {...field} />
}
