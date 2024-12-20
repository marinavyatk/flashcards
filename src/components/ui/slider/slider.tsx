import { ComponentPropsWithoutRef, PointerEvent, useEffect, useRef } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'
import { SliderProps as RadixSliderProps } from '@radix-ui/react-slider'
import clsx from 'clsx'

import s from './slider.module.scss'

export type SliderProps = {
  rootProps: RadixSliderProps
} & ComponentPropsWithoutRef<'div'>

export const Slider = ({ className, rootProps, ...restProps }: SliderProps) => {
  const minValueRef = useRef<HTMLInputElement>(null)
  const maxValueRef = useRef<HTMLInputElement>(null)
  const classNames = clsx(s.sliderContainer, className)
  const rootClassNames = clsx(s.sliderRoot, rootProps.className)

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
      <div className={s.extremeNumber} ref={minValueRef} />
      <RadixSlider.Root
        {...rootProps}
        className={rootClassNames}
        onLostPointerCapture={(event: PointerEvent) => {
          const target = event.target as HTMLSpanElement
          const value = Number(target.ariaValueNow)

          rootProps.onValueCommit?.([value, value])
        }}
        onValueChange={value => {
          rootProps.onValueChange?.(value)

          if (minValueRef.current && maxValueRef.current) {
            minValueRef.current.innerText = `${value[0]}`
            maxValueRef.current.innerText = `${value[1]}`
          }
        }}
      >
        <RadixSlider.Track className={s.sliderTrack}>
          <RadixSlider.Range className={s.sliderRange} />
        </RadixSlider.Track>
        <RadixSlider.Thumb className={s.sliderThumb} />
        <RadixSlider.Thumb className={s.sliderThumb} />
      </RadixSlider.Root>
      <div className={s.extremeNumber} ref={maxValueRef} />
    </div>
  )
}
