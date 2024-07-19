import { useEffect, useState } from 'react'

import { useDebounce } from '@/common/customHooks/useDebounce'
import { TextField, TextFieldProps } from '@/components/ui/textField/textField'

import s from '@/pages/mainPage/mainPage.module.scss'

type TextFieldDebouncedProps = {
  setSearchInputValue: (value: string) => void
  valueFromSearchParams: null | string
} & TextFieldProps
export const TextFieldDebounced = (props: TextFieldDebouncedProps) => {
  const { setSearchInputValue, valueFromSearchParams, ...restProps } = props
  const [inputValue, setInputValue] = useState(valueFromSearchParams ?? '')
  const debouncedInputValue = useDebounce(inputValue, 1000)

  useEffect(() => {
    setSearchInputValue(debouncedInputValue)
  }, [debouncedInputValue])

  return (
    <TextField
      containerProps={{ className: s.searchFilter }}
      onValueChange={setInputValue}
      type={'search'}
      value={inputValue}
      {...restProps}
    />
  )
}
