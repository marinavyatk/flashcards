import { ComponentPropsWithoutRef } from 'react'

import PlayIcon from '@/assets/svg/playIcon.svg?react'
import SettingIcon from '@/assets/svg/settingIcon.svg?react'
import {
  ConfirmDeleteModal,
  DeletedElement,
} from '@/components/layouts/modals/confirmDeleteModal/confirmDeleteModal'
import { EditDeckModal } from '@/components/layouts/modals/editDeck/editDeck'
import {
  DropdownItem,
  DropdownMenuComponent,
  DropdownSeparator,
} from '@/components/ui/dropdownMenu'
import { Typography } from '@/components/ui/typography'

import s from './settingDropdown.module.scss'

export type SettingDropdownProps = {
  deletedElement: DeletedElement
  elementName?: string
  id: string
  onConfirmDelete: (id: string) => void
  onEdit: (id: string) => void
} & ComponentPropsWithoutRef<'div'>

export const SettingDropdown = (props: SettingDropdownProps) => {
  const { className, deletedElement, elementName, id, onConfirmDelete, onEdit, ...restProps } =
    props

  return (
    <DropdownMenuComponent
      trigger={
        <span className={s.trigger}>
          <SettingIcon />
        </span>
      }
      {...restProps}
      className={className}
      contentProps={{ alignOffset: -5 }}
    >
      <DropdownItem className={s.item}>
        <PlayIcon />
        <Typography as={'span'} variant={'caption'}>
          Learn
        </Typography>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem className={s.item}>
        <EditDeckModal id={id} onFormSubmit={() => onEdit(id)} triggerText={'Edit'} />
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem className={s.item}>
        <ConfirmDeleteModal
          deletedElement={deletedElement}
          elementName={elementName}
          onConfirm={() => onConfirmDelete(id)}
          triggerText={'Delete'}
        />
        <Typography as={'span'} variant={'caption'}></Typography>
      </DropdownItem>
    </DropdownMenuComponent>
  )
}
