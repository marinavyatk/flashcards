import { ComponentPropsWithoutRef } from 'react'

import ArrowPaginationIcon from '@/assets/svg/paginationArrow.svg?react'
import { DOTS, usePagination, usePaginationProps } from '@/components/ui/pagination/usePagination'
import clsx from 'clsx'

import s from './pagination.module.scss'

export type PaginationProps = {
  onPageChange: (pageNumber: number) => void
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
        <button
          aria-label={'Go to previous page'}
          className={clsx(s.paginationItem, s.arrowLeft)}
          disabled={currentPage === 1}
          type={'button'}
        >
          <ArrowPaginationIcon />
        </button>
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li className={s.paginationDots} key={pageNumber + index}>
              &#8230;
            </li>
          )
        }
        if (typeof pageNumber !== 'string') {
          return (
            <li key={pageNumber}>
              <button
                aria-label={`Go to page ${pageNumber}`}
                className={clsx(s.paginationItem, {
                  [s.selected]: pageNumber === currentPage,
                })}
                onClick={() => onPageChange(pageNumber)}
                type={'button'}
                value={pageNumber}
              >
                {pageNumber}
              </button>
            </li>
          )
        }
      })}
      <li onClick={onNext}>
        <button
          aria-label={'Go to next page'}
          className={clsx(s.paginationItem, s.arrowRight)}
          disabled={currentPage === lastPage}
          type={'button'}
        >
          <ArrowPaginationIcon />
        </button>
      </li>
    </ul>
  )
}
