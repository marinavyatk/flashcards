import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextArea, TextAreaProps } from '@/components/ui/textarea/textarea'

export type FormTextAreaProps<T extends FieldValues> = Omit<
  TextAreaProps,
  'id' | 'onChange' | 'value'
> &
  UseControllerProps<T>
export const FormTextArea = <T extends FieldValues>(props: FormTextAreaProps<T>) => {
  const { control, defaultValue, name, rules, shouldUnregister, ...textAreaProps } = props
  const {
    field,
    fieldState: { error },
  } = useController({ control, defaultValue, name, rules, shouldUnregister })

  return <TextArea {...textAreaProps} errorMessage={error?.message} {...field} />
}
