import { ComponentPropsWithoutRef, useState } from 'react'

import * as Slider from '@radix-ui/react-slider'
import { SliderProps } from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type SliderComponentProps = {
  rootProps?: SliderProps
} & ComponentPropsWithoutRef<'div'>

export const SliderComponent = ({ className, rootProps, ...restProps }: SliderComponentProps) => {
  const [values, setValuesValue] = useState(rootProps?.defaultValue || [2, 8])
  const changeValue = (values: number[]) => {
    setValuesValue(values)
  }

  return (
    <div className={s.sliderContainer + ' ' + className} {...restProps}>
      <div className={s.extremeNumber}>{values[0]}</div>

      <Slider.Root
        {...rootProps}
        className={s.sliderRoot}
        onValueChange={changeValue}
        value={values}
      >
        <Slider.Track className={s.sliderTrack}>
          <Slider.Range className={s.sliderRange} />
        </Slider.Track>
        <Slider.Thumb className={s.sliderThumb} />
        <Slider.Thumb className={s.sliderThumb} />
      </Slider.Root>
      <div className={s.extremeNumber}>{values[1]}</div>
    </div>
  )
}
