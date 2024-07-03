import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import {
  InputFileCover,
  InputFileCoverProps,
} from '@/components/ui/inputFile/InputFileCover/InputFileCover'

export type FormInputFileCoverProps<T extends FieldValues> = Omit<
  InputFileCoverProps,
  'id' | 'onBlur' | 'onChange' | 'value'
> &
  UseControllerProps<T>

export const FormInputFileCover = <T extends FieldValues>(props: FormInputFileCoverProps<T>) => {
  const { control, defaultValue, name, ...inputFileProps } = props
  const { field } = useController({ control, defaultValue, name })

  return <InputFileCover {...inputFileProps} {...field} value={field.value?.fileName} />
}
