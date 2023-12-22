import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { CheckboxComponent } from '@/components/ui/checkbox'
import { CheckboxProps } from '@radix-ui/react-checkbox'

export type ControlledCheckboxProps<T extends FieldValues> = UseControllerProps<T> & {
  checkboxTitle: string
} & Omit<CheckboxProps, 'id' | 'onChange' | 'value'>
const ControlledCheckbox = <T extends FieldValues>(props: ControlledCheckboxProps<T>) => {
  const { control, defaultValue, name, rules, shouldUnregister, ...checkboxProps } = props
  const {
    field: { onChange, ref, value },
  } = useController({ control, defaultValue, name, rules, shouldUnregister })

  return <CheckboxComponent checked={value} name={name} onCheckedChange={onChange} ref={ref} />
}

export default ControlledCheckbox

//to use it in form you need to point name, control and checkboxTitle as in the example:
// <ControlledCheckbox checkboxTitle={'remember me'} control={control} name={'rememberMe'} />
