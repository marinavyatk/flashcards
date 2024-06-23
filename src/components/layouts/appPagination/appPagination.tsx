import { ComponentPropsWithoutRef } from 'react'

import { Pagination, PaginationProps } from '@/components/ui/pagination/pagination'
import { SelectComponent, SelectComponentProps } from '@/components/ui/select'
import clsx from 'clsx'

import s from './appPagination.module.scss'

export type AppPaginationProps = {
  paginationProps: Omit<PaginationProps, 'pageSize'>
  selectProps: Omit<SelectComponentProps, 'itemProps' | 'triggerValue'>
} & ComponentPropsWithoutRef<'div'>
export const AppPagination = (props: AppPaginationProps) => {
  const { className, paginationProps, selectProps, ...restProps } = props
  const classNames = clsx(s.appPagination, className)

  return (
    <div className={classNames} {...restProps}>
      <Pagination
        currentPage={paginationProps?.currentPage}
        onPageChange={paginationProps?.onPageChange}
        pageSize={Number(selectProps.rootProps?.value) || 10}
        totalCount={paginationProps?.totalCount}
      />
      <div className={s.selectWithText}>
        Показать
        <SelectComponent
          {...selectProps}
          itemProps={[
            { value: '10' },
            { value: '20' },
            { value: '30' },
            { value: '50' },
            { value: '100' },
          ]}
          triggerValue={{ placeholder: selectProps.rootProps?.value || '10' }}
        />
        на странице
      </div>
    </div>
  )
}
