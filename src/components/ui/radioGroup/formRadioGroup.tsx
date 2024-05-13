import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioGroupComponent, RadioGroupComponentProps } from '@/components/ui/radioGroup/index'

export type FormRadioGroupProps<T extends FieldValues> = Omit<
  RadioGroupComponentProps,
  'id' | 'onChange' | 'value'
> &
  UseControllerProps<T>
export const FormRadioGroup = <T extends FieldValues>(props: FormRadioGroupProps<T>) => {
  const { control, defaultValue, name, rules, shouldUnregister, ...radioGroupProps } = props
  const {
    field: { onChange, ref, value },
  } = useController({ control, defaultValue, name, rules, shouldUnregister })

  return (
    <RadioGroupComponent
      id={name}
      onValueChange={onChange}
      ref={ref}
      value={value}
      {...radioGroupProps}
    />
  )
}
