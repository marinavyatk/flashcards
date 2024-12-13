import { useMediaQuery } from 'react-responsive'

import { orderByValueDefault } from '@/common/constants'
import { decksTableData } from '@/common/tableData'
import { DecksTableBody } from '@/components/layouts/appTable/decksTableBody'
import { TableHead } from '@/components/layouts/appTable/tableHead'
import {
  DeckTableMobile,
  DeckTableMobileProps,
} from '@/components/layouts/mobile/deckTableMobile/deckTableMobile'
import { Table } from '@/components/ui/table'

import s from '@/pages/mainPage/mainPage.module.scss'

type DeckTableProps = {
  handleOrderByChange: (sort: string) => void
  orderBy: null | string
} & DeckTableMobileProps

export const DeckTable = (props: DeckTableProps) => {
  const {
    containerProps,
    handleOrderByChange,
    onDeleteDeckTriggerClick,
    onEditDeckTriggerClick,
    onGoToDeck,
    onLearn,
    orderBy,
    tableRowsData,
    userId,
  } = props

  const isTabletOrMobile = useMediaQuery({ maxWidth: 900 })

  return isTabletOrMobile ? (
    <DeckTableMobile
      containerProps={{ className: s.table }}
      onDeleteDeckTriggerClick={onDeleteDeckTriggerClick}
      onEditDeckTriggerClick={onEditDeckTriggerClick}
      onGoToDeck={onGoToDeck}
      onLearn={onLearn}
      tableRowsData={tableRowsData}
      userId={userId}
      {...containerProps}
    />
  ) : (
    <Table
      className={s.table}
      thead={
        <tr>
          <TableHead
            cellsData={decksTableData}
            changeSort={handleOrderByChange}
            currentOrderBy={orderBy}
            defaultValue={orderByValueDefault}
          />
        </tr>
      }
    >
      <DecksTableBody
        onDeleteDeckTriggerClick={onDeleteDeckTriggerClick}
        onEditDeckTriggerClick={onEditDeckTriggerClick}
        onGoToDeck={onGoToDeck}
        onLearn={onLearn}
        tableRowsData={tableRowsData}
        userId={userId}
      />
    </Table>
  )
}
