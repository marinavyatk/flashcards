import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import CheckboxCheckedIcon from '@/assets/svg/checkbox-checked.svg?react'
import CheckboxUncheckedIcon from '@/assets/svg/checkbox-unchecked.svg?react'
import { Typography } from '@/components/ui/typography'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckboxProps } from '@radix-ui/react-checkbox'
import clsx from 'clsx'

import s from './checkbox.module.scss'

export type CheckboxComponentProps = {
  containerProps?: ComponentPropsWithoutRef<'div'>
  label?: string
} & CheckboxProps

export const CheckboxComponent = forwardRef<
  ElementRef<typeof Checkbox.Root>,
  CheckboxComponentProps
>((props: CheckboxComponentProps, ref) => {
  const { className, containerProps, id, label, ...rest } = props
  const generatedId = useId()
  const finalId = id ?? generatedId
  const classNames = clsx(s.checkbox, containerProps?.className)

  return (
    <div {...containerProps} className={classNames}>
      <Checkbox.Root className={s.checkboxRoot} id={finalId} ref={ref} {...rest}>
        <Checkbox.Indicator className={s.checkboxIndicator}>
          <CheckboxCheckedIcon className={s.checkboxCheckedIcon} />
        </Checkbox.Indicator>
        <CheckboxUncheckedIcon className={s.checkboxUncheckedIcon} />
      </Checkbox.Root>
      <Typography as={'label'} htmlFor={finalId} variant={'body2'}>
        {label}
      </Typography>
    </div>
  )
})
