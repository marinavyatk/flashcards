import { ComponentPropsWithoutRef } from 'react'

import { selectMinValue } from '@/common/constants'
import { Pagination, PaginationProps } from '@/components/ui/pagination/pagination'
import { Select, SelectProps } from '@/components/ui/select'
import clsx from 'clsx'

import s from './appPagination.module.scss'

export type AppPaginationProps = {
  paginationProps: Omit<PaginationProps, 'pageSize'>
  selectProps: Omit<SelectProps, 'itemProps' | 'triggerValue'>
} & ComponentPropsWithoutRef<'div'>

export const AppPagination = (props: AppPaginationProps) => {
  const { className, paginationProps, selectProps, ...restProps } = props
  const classNames = clsx(s.appPagination, className)
  const showSelect = paginationProps?.totalCount / selectMinValue > 1
  const isOptionDisabled = (prevValue: number) => {
    return paginationProps?.totalCount / prevValue <= 1
  }

  return (
    <div className={classNames} {...restProps}>
      <Pagination
        currentPage={paginationProps?.currentPage}
        onPageChange={paginationProps?.onPageChange}
        pageSize={Number(selectProps.rootProps?.value) || 10}
        totalCount={paginationProps?.totalCount}
      />
      {showSelect && (
        <div className={s.selectWithText}>
          Show
          <Select
            {...selectProps}
            itemProps={[
              { value: '10' },
              { disabled: isOptionDisabled(10), value: '20' },
              { disabled: isOptionDisabled(20), value: '30' },
              { disabled: isOptionDisabled(30), value: '50' },
              { disabled: isOptionDisabled(50), value: '100' },
            ]}
            triggerValue={{ placeholder: selectProps.rootProps?.value || '10' }}
          />
          on the page
        </div>
      )}
    </div>
  )
}
