import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { CheckboxComponentProps } from '@//components/ui/checkbox/checkbox'
import { CheckboxComponent } from '@/components/ui/checkbox/index'

export type FormCheckboxProps<T extends FieldValues> = {} & Omit<
  CheckboxComponentProps,
  'id' | 'onChange' | 'value'
> &
  UseControllerProps<T>
export const FormCheckbox = <T extends FieldValues>(props: FormCheckboxProps<T>) => {
  const { control, defaultValue, name, rules, shouldUnregister, ...checkboxProps } = props
  const {
    field: { onChange, ref, value },
  } = useController({ control, defaultValue, name, rules, shouldUnregister })

  return (
    <CheckboxComponent
      checked={value}
      name={name}
      onCheckedChange={onChange}
      ref={ref}
      {...checkboxProps}
    />
  )
}
