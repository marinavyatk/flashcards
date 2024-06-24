import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { CheckboxInputProps } from '@//components/ui/checkbox/checkbox'
import { CheckboxInput } from '@/components/ui/checkbox/index'

export type FormCheckboxProps<T extends FieldValues> = {} & Omit<
  CheckboxInputProps,
  'id' | 'onChange' | 'value'
> &
  UseControllerProps<T>
export const FormCheckbox = <T extends FieldValues>(props: FormCheckboxProps<T>) => {
  const { control, defaultValue, name, rules, shouldUnregister, ...checkboxProps } = props
  const {
    field: { onChange, ref, value },
  } = useController({ control, defaultValue, name, rules, shouldUnregister })

  return (
    <CheckboxInput
      checked={value}
      name={name}
      onCheckedChange={onChange}
      ref={ref}
      {...checkboxProps}
    />
  )
}
