import { useMediaQuery } from 'react-responsive'

import { cardsTableData } from '@/common/tableData'
import { CardsTableBody } from '@/components/layouts/appTable/cards/cardsTableBody'
import {
  CardsTableMobile,
  CardsTableMobileProps,
} from '@/components/layouts/appTable/cards/cardsTableMobile/cardsTableMobile'
import { TableHead } from '@/components/layouts/appTable/tableHead'
import { Table } from '@/components/ui/table'

type CardsTableProps = {
  handleOrderByChange: (sort: string) => void
  orderBy: null | string
} & CardsTableMobileProps

export const CardsTable = (props: CardsTableProps) => {
  const {
    containerProps,
    handleOrderByChange,
    isMyDeck,
    onDeleteCardTriggerClick,
    onEditCardTriggerClick,
    orderBy,
    tableRowsData,
  } = props

  const isTabletOrMobile = useMediaQuery({ maxWidth: 900 })

  return isTabletOrMobile ? (
    <CardsTableMobile
      containerProps={containerProps}
      isMyDeck={isMyDeck}
      onDeleteCardTriggerClick={onDeleteCardTriggerClick}
      onEditCardTriggerClick={onEditCardTriggerClick}
      tableRowsData={tableRowsData}
    />
  ) : (
    <Table
      thead={
        <tr>
          <TableHead
            cellsData={cardsTableData}
            changeSort={handleOrderByChange}
            currentOrderBy={orderBy}
            defaultValue={'updated-desc'}
          />
          {isMyDeck && <th></th>}
        </tr>
      }
    >
      <CardsTableBody
        isMyDeck={isMyDeck}
        onDeleteCardTriggerClick={onDeleteCardTriggerClick}
        onEditCardTriggerClick={onEditCardTriggerClick}
        tableRowsData={tableRowsData}
      />
    </Table>
  )
}
