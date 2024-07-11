import { SortElement } from '@/components/ui/sortElement/sortElement'

import s from './appTable.module.scss'

export type Cell = {
  name: string
  orderBy: string
}

export type TableHeadProps = {
  cellsData: Cell[]
  changeSort: (sort: string) => void
  currentOrderBy: null | string
  defaultValue: string
}

export const TableHead = (props: TableHeadProps) => {
  const { cellsData, changeSort, currentOrderBy, defaultValue } = props
  const tableHeadCells = cellsData.map(item => {
    return (
      <th className={s.th} key={item.orderBy}>
        <SortElement
          changeSort={changeSort}
          currentOrderBy={currentOrderBy}
          defaultValue={defaultValue}
          orderBy={item.orderBy}
        >
          {item.name}
        </SortElement>
      </th>
    )
  })

  return <>{tableHeadCells}</>
}
