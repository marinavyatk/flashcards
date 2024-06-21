import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import ArrowDown from '@/assets/svg/arrowDown.svg?react'
import BinIcon from '@/assets/svg/binIcon.svg?react'
import DeleteIcon from '@/assets/svg/deleteIcon.svg?react'
import EditIcon from '@/assets/svg/editIcon.svg?react'
import PlayIcon from '@/assets/svg/playIcon.svg?react'
import { debounce, formatDate } from '@/common/commonFunctions'
import { AppPagination } from '@/components/layouts/appPagination/appPagination'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { SliderComponent } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tabSwitcher'
import { Table } from '@/components/ui/table'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { PageTemplate } from '@/pages/PageTemplate/pageTemplate'
import { useGetCurrentUserDataQuery } from '@/services/auth/authApi'
import { useGetDecksQuery, useGetMinMaxCardAmountQuery } from '@/services/decks/decksApi'

import s from './mainPage.module.scss'

export let debounceHandler: any = null

export const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search')
  const minCardsCount = searchParams.get('minCardsCount')
  const maxCardsCount = searchParams.get('maxCardsCount')
  const deckOwnership = searchParams.get('deckOwnership')

  console.log('deckOwnership', deckOwnership)

  const [inputSearchValue, setInputSearchValue] = useState(search ?? '')

  useMemo(() => {
    debounceHandler = debounce(
      () => {
        if (inputSearchValue) {
          searchParams.set('search', inputSearchValue)
        } else {
          searchParams.delete('search')
        }
        setSearchParams(searchParams)
      },
      debounceHandler,
      1000
    )
  }, [inputSearchValue])

  const handleSearchChange = (value: string) => {
    setInputSearchValue(value)
  }

  const handleCardsCountChange = (values: number[]) => {
    if (values[0] !== minMaxData?.min) {
      searchParams.set('minCardsCount', String(values[0]))
    } else {
      searchParams.delete('minCardsCount')
    }
    if (values[1] !== minMaxData?.max) {
      searchParams.set('maxCardsCount', String(values[1]))
    } else {
      searchParams.delete('maxCardsCount')
    }
    setSearchParams(searchParams)
  }

  const handleSwitchDeckOwnership = (value: string) => {
    console.log('handleSwitchDeckOwnership')

    if (value === 'My Cards') {
      searchParams.set('deckOwnership', '~caller')
    } else {
      searchParams.delete('deckOwnership')
    }
    setSearchParams(searchParams)
  }

  const { data: minMaxData } = useGetMinMaxCardAmountQuery()
  const { data: userData } = useGetCurrentUserDataQuery()

  const { data } = useGetDecksQuery({
    authorId: deckOwnership ? deckOwnership : undefined,
    maxCardsCount: maxCardsCount !== null ? Number(maxCardsCount) : minMaxData?.max,
    minCardsCount: minCardsCount !== null ? Number(minCardsCount) : minMaxData?.min,
    name: search ?? undefined,
  })

  console.log('pagination', data?.pagination)

  const cardsNumbersFromSearchParams = [
    minCardsCount !== null ? Number(minCardsCount) : minMaxData?.min,
    maxCardsCount !== null ? Number(maxCardsCount) : minMaxData?.max,
  ]

  const cardsNumberInitialValues = useMemo(() => {
    if (
      cardsNumbersFromSearchParams[0] === undefined ||
      cardsNumbersFromSearchParams[1] === undefined
    ) {
      return undefined
    }

    return cardsNumbersFromSearchParams
  }, [minMaxData, minCardsCount, maxCardsCount])

  const tableRows = data?.items.map(item => {
    const isMyDeck = item.author.id === userData?.id

    return (
      <tr key={item.id}>
        <td>
          <div className={s.deckMainInfo}>
            {item.cover && <img alt={`${item.name} cover`} src={item.cover} />}
            <Typography as={'span'}>{item.name}</Typography>
          </div>
        </td>
        <td>{item.cardsCount}</td>
        <td>{formatDate(item.created)}</td>
        <td>{item.author.name}</td>
        <td>
          <div className={s.actions}>
            <button>
              <PlayIcon />
            </button>
            {isMyDeck && (
              <button>
                <EditIcon />
              </button>
            )}
            {isMyDeck && (
              <button>
                <DeleteIcon />
              </button>
            )}
          </div>
        </td>
      </tr>
    )
  })

  return (
    <PageTemplate>
      <div className={s.mainPage}>
        <div className={s.container}>
          <Typography as={'h1'} variant={'large'}>
            Decks list
          </Typography>
          <Modal modalHeader={'Add New Deck'} trigger={<Button>Add New Deck</Button>} />
        </div>
        <div className={s.container}>
          <TextField
            containerProps={{ className: s.searchFilter }}
            onValueChange={handleSearchChange}
            type={'search'}
            value={inputSearchValue}
          />
          <div className={s.elementWithCaption}>
            <Typography as={'span'} variant={'body2'}>
              Show decks cards
            </Typography>
            <TabSwitcher
              defaultValue={'All Cards'}
              itemProps={[{ value: 'My Cards' }, { value: 'All Cards' }]}
              onValueChange={handleSwitchDeckOwnership}
              value={deckOwnership === '~caller' ? 'My Cards' : 'All Cards'}
            />
          </div>
          <div className={s.elementWithCaption}>
            <Typography as={'span'} variant={'body2'}>
              Number of cards
            </Typography>
            <SliderComponent
              rootProps={{
                defaultValue: cardsNumberInitialValues,
                max: minMaxData ? minMaxData.max : undefined,
                min: minMaxData ? minMaxData.min : undefined,
                onValueCommit: handleCardsCountChange,
              }}
            />
          </div>

          <Button variant={'secondary'}>
            <BinIcon /> Clear Filter
          </Button>
        </div>
        <Table
          className={s.table}
          tbody={<>{tableRows}</>}
          thead={
            <tr>
              <th>Deck name</th>
              <th>Cards</th>
              <th>
                Last Updated <ArrowDown />
              </th>
              <th>Created by</th>
              <th></th>
            </tr>
          }
        />
        <AppPagination
          paginationProps={{
            currentPage: data?.pagination.currentPage || 1,
            onPageChange: () => {},
            totalCount: data?.pagination.totalItems || 1,
          }}
        />
      </div>
    </PageTemplate>
  )
}
