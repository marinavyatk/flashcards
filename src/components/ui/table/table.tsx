import { ComponentPropsWithoutRef, ReactNode } from 'react'

import clsx from 'clsx'

import s from './table.module.scss'

export type TableProps = {
  thead: ReactNode
} & ComponentPropsWithoutRef<'table'>

export const Table = (props: TableProps) => {
  const { children, className, thead, ...restProps } = props
  const classNames = clsx(s.table, className)

  return (
    <table {...restProps} className={classNames}>
      <thead>{thead}</thead>
      <tbody>{children}</tbody>
    </table>
  )
}
