import { ComponentPropsWithoutRef } from 'react'

import ArrowPaginationIcon from '@/assets/svg/paginationArrow.svg?react'
import { DOTS, usePagination, usePaginationProps } from '@/components/ui/pagination/usePagination'
import clsx from 'clsx'

import s from './pagination.module.scss'

export type PaginationProps = {
  onPageChange: (pageNumber: number | string) => void
} & ComponentPropsWithoutRef<'div'> &
  usePaginationProps

export const Pagination = (props: PaginationProps) => {
  const { className, currentPage, onPageChange, pageSize, siblingCount = 1, totalCount } = props
  const classNames = clsx(s.pagination, className)

  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount,
    totalCount,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <ul className={classNames}>
      <li onClick={onPrevious}>
        <button className={clsx(s.paginationItem, s.arrowLeft)} disabled={currentPage === 1}>
          <ArrowPaginationIcon />
        </button>
      </li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return (
            <li className={s.paginationDots} key={pageNumber}>
              &#8230;
            </li>
          )
        }

        return (
          <li key={pageNumber} onClick={() => onPageChange(pageNumber)}>
            <button
              className={clsx(s.paginationItem, {
                [s.selected]: pageNumber === currentPage,
              })}
            >
              {pageNumber}
            </button>
          </li>
        )
      })}
      <li onClick={onNext}>
        <button
          className={clsx(s.paginationItem, s.arrowRight)}
          disabled={currentPage === lastPage}
        >
          <ArrowPaginationIcon />
        </button>
      </li>
    </ul>
  )
}
