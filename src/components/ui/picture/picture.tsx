import { ComponentPropsWithoutRef, useState } from 'react'

import { Loader, LoaderProps } from '@/components/ui/loader/loader'
import { clsx } from 'clsx'

import s from './picture.module.scss'

export type PictureProps = {
  containerProps?: ComponentPropsWithoutRef<'div'>
  loaderProps?: LoaderProps
} & ComponentPropsWithoutRef<'img'>

export const Picture = (props: PictureProps) => {
  const { containerProps, loaderProps, ...restProps } = props
  const classNames = clsx(s.imgContainer, containerProps?.className)
  const [loading, setLoading] = useState(true)

  const handleImageLoaded = () => {
    setLoading(false)
  }

  return (
    <div {...containerProps} className={classNames}>
      {loading && <Loader {...loaderProps} className={clsx(s.loader, loaderProps?.className)} />}
      <img onLoad={handleImageLoaded} {...restProps} className={s.img} />
    </div>
  )
}
