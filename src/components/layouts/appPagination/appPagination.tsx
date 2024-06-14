import { ComponentPropsWithoutRef, useState } from 'react'

import { Pagination, PaginationProps } from '@/components/ui/pagination/pagination'
import { SelectComponent } from '@/components/ui/select'
import clsx from 'clsx'

import s from './appPagination.module.scss'

export type AppPaginationProps = {
  paginationProps: Omit<PaginationProps, 'pageSize'>
} & ComponentPropsWithoutRef<'div'>
export const AppPagination = (props: AppPaginationProps) => {
  const { className, paginationProps, ...restProps } = props
  const classNames = clsx(s.appPagination, className)
  const [pageSize, setPageSize] = useState('10')

  return (
    <div className={classNames} {...restProps}>
      <Pagination
        currentPage={paginationProps?.currentPage}
        onPageChange={paginationProps?.onPageChange}
        pageSize={+pageSize}
        totalCount={paginationProps?.totalCount}
      />
      <div className={s.selectWithText}>
        Показать
        <SelectComponent
          itemProps={[
            { value: '10' },
            { value: '20' },
            { value: '30' },
            { value: '50' },
            { value: '100' },
          ]}
          rootProps={{
            onValueChange: setPageSize,
            value: pageSize,
          }}
          triggerValue={{ placeholder: pageSize }}
        />
        на странице
      </div>
    </div>
  )
}
