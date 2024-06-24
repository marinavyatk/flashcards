import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { InputFileCover, InputFileCoverProps } from '@/components/ui/InputFileCover/InputFileCover'

export type FormInputFileCoverProps<T extends FieldValues> = Omit<
  InputFileCoverProps,
  'id' | 'onBlur' | 'onChange' | 'value'
> &
  UseControllerProps<T>

export const FormInputFileCover = <T extends FieldValues>(props: FormInputFileCoverProps<T>) => {
  const { control, defaultValue, name, ...inputFileProps } = props
  const {
    field,
    fieldState: { error },
  } = useController({ control, defaultValue, name })

  return (
    <InputFileCover
      {...inputFileProps}
      {...field}
      errorMessage={error?.message}
      value={field.value?.fileName}
    />
  )
}
