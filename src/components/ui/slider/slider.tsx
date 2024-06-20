import { ComponentPropsWithoutRef, useEffect, useRef } from 'react'

import * as Slider from '@radix-ui/react-slider'
import { SliderProps } from '@radix-ui/react-slider'
import clsx from 'clsx'

import s from './slider.module.scss'

export type SliderComponentProps = {
  rootProps: SliderProps
} & ComponentPropsWithoutRef<'div'>

export const SliderComponent = ({ className, rootProps, ...restProps }: SliderComponentProps) => {
  const minValueRef = useRef<HTMLInputElement>(null)
  const maxValueRef = useRef<HTMLInputElement>(null)
  const classNames = clsx(s.sliderContainer, className)

  useEffect(() => {
    if (minValueRef.current && maxValueRef.current && rootProps?.defaultValue) {
      minValueRef.current.innerText = `${rootProps?.defaultValue[0]}`
      maxValueRef.current.innerText = `${rootProps?.defaultValue[1]}`
    }
  }, [rootProps?.defaultValue])

  if (!rootProps.defaultValue) {
    return
  }

  return (
    <div className={classNames} {...restProps}>
      <div className={s.extremeNumber} id={'val'} ref={minValueRef} />

      <Slider.Root
        {...rootProps}
        className={s.sliderRoot}
        onValueChange={value => {
          rootProps.onValueChange?.(value)

          if (minValueRef.current && maxValueRef.current) {
            minValueRef.current.innerText = `${value[0]}`
            maxValueRef.current.innerText = `${value[1]}`
          }
        }}
        value={rootProps.value}
      >
        <Slider.Track className={s.sliderTrack}>
          <Slider.Range className={s.sliderRange} />
        </Slider.Track>
        <Slider.Thumb className={s.sliderThumb} />
        <Slider.Thumb className={s.sliderThumb} />
      </Slider.Root>
      <div className={s.extremeNumber} ref={maxValueRef} />
    </div>
  )
}
