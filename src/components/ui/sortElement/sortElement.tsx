import { ComponentPropsWithoutRef, useEffect, useState } from 'react'

import ArrowIcon from '@/assets/svg/arrowDown.svg?react'
import clsx from 'clsx'

import s from './sortElement.module.scss'

export type SortElementProps = {
  changeSort: (sort: string) => void
  currentOrderBy: null | string
  defaultValue: string
  orderBy: string
} & ComponentPropsWithoutRef<'button'>

export const SortElement = (props: SortElementProps) => {
  const {
    changeSort,
    children,
    className,
    currentOrderBy,
    defaultValue,
    name,
    orderBy,
    ...restProps
  } = props
  const classNames = clsx(s.sortButton, className)
  const [icon, setIcon] = useState<string | undefined>(undefined)
  const currentSort = currentOrderBy ? currentOrderBy : defaultValue
  const currentSortDataArray = currentSort.split('-')
  const currentSortField = currentSortDataArray[0]
  const currentSortDirection = currentSortDataArray[1]

  useEffect(() => {
    if (currentSortField !== orderBy) {
      setIcon(undefined)
    } else {
      setIcon(currentSortDirection)
    }
  }, [currentSort])

  const defineNewOrderBy = (
    orderBy: string,
    currentSortField: string,
    currentSortDirection: string
  ) => {
    let newSortDirection

    if (currentSortField !== orderBy) {
      newSortDirection = 'asc'
      setIcon(newSortDirection)
    } else {
      newSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc'
      setIcon(newSortDirection)
    }

    return `${orderBy}-${newSortDirection}`
  }

  const handleChangeSort = () => {
    changeSort(defineNewOrderBy(orderBy, currentSortField, currentSortDirection))
  }

  return (
    <button {...restProps} className={classNames} onClick={handleChangeSort} type={'button'}>
      {children}
      {icon && <ArrowIcon className={icon === 'asc' ? s.ascArrow : s.descArrow} />}
    </button>
  )
}
