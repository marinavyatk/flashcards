import { ComponentPropsWithoutRef } from 'react'

import BinIcon from '@/assets/svg/binIcon.svg?react'
import EditIcon from '@/assets/svg/editIcon.svg?react'
import PlayIcon from '@/assets/svg/playIcon.svg?react'
import SettingIcon from '@/assets/svg/settingIcon.svg?react'
import { DeletedElement } from '@/components/layouts/modals/confirmDeleteModal/confirmDeleteModal'
import {
  DropdownItem,
  DropdownMenuComponent,
  DropdownMenuComponentProps,
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
  onLearn: (id: string) => void
  otherDropDownProps?: DropdownMenuComponentProps
} & ComponentPropsWithoutRef<'div'>

export const SettingDropdown = (props: SettingDropdownProps) => {
  const {
    className,
    deletedElement,
    elementName,
    id,
    onConfirmDelete,
    onEdit,
    onLearn,
    open,
    otherDropDownProps,
    setOpen,
    ...restProps
  } = props

  return (
    <DropdownMenuComponent
      trigger={
        <span className={s.trigger}>
          <SettingIcon />
        </span>
      }
      {...otherDropDownProps}
      {...restProps}
      className={className}
      contentProps={{ alignOffset: -5 }}
    >
      <DropdownItem className={s.item} onClick={onLearn}>
        <PlayIcon /> Learn
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem className={s.item} onClick={onEdit}>
        <EditIcon /> Edit
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem className={s.item} onClick={onConfirmDelete}>
        <BinIcon /> Delete
      </DropdownItem>
    </DropdownMenuComponent>
  )
}
