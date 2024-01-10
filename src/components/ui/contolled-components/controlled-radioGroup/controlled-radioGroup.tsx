import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioGroupComponent } from '@/components/ui/radioGroup'
import { RadioGroupProps } from '@radix-ui/react-radio-group'

export type ControlledRadioGroupProps<T extends FieldValues> = UseControllerProps<T> & {
  checkboxTitle: string
} & Omit<RadioGroupProps, 'id' | 'onChange' | 'value'>
const ControlledRadioGroup = <T extends FieldValues>(props: ControlledRadioGroupProps<T>) => {
  const { control, defaultValue, name, rules, shouldUnregister, ...radioGroupProps } = props
  const {
    field: { onChange, ref, value },
  } = useController({ control, defaultValue, name, rules, shouldUnregister })

  return <RadioGroupComponent id={name} onChange={onChange} ref={ref} value={value} />
}

export default ControlledRadioGroup

//to use it in form you need to point name, control and checkboxTitle as in the example:
// <ControlledCheckbox checkboxTitle={'remember me'} control={control} name={'rememberMe'} />
