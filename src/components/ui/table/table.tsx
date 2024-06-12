import { ComponentPropsWithoutRef, ReactNode } from 'react'

import clsx from 'clsx'

import s from './table.module.scss'

export type TableProps = {
  tbody: ReactNode
  thead: ReactNode
} & ComponentPropsWithoutRef<'table'>

export const Table = (props: TableProps) => {
  const { children, className, tbody, thead, ...restProps } = props
  const classNames = clsx(s.table, className)

  return (
    <table {...restProps} className={classNames}>
      <thead>{thead}</thead>
      <tbody>{tbody}</tbody>
    </table>
  )
}
