import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import BinIcon from '@/assets/svg/binIcon.svg?react'
import EditIcon from '@/assets/svg/editIcon.svg?react'
import PlayIcon from '@/assets/svg/playIcon.svg?react'
import SettingIcon from '@/assets/svg/settingIcon.svg?react'
import { DeletedElement } from '@/components/layouts/modals/confirmDeleteModal/confirmDeleteModal'
import {
  DropdownItem,
  DropdownMenu,
  DropdownMenuProps,
  DropdownSeparator,
} from '@/components/ui/dropdownMenu'

import s from './settingDropdown.module.scss'

export type SettingDropdownProps = {
  deletedElement: DeletedElement
  elementName?: string
  id: string
  learnPath: string
  onConfirmDelete: () => void
  onEdit: () => void
  otherDropDownProps?: DropdownMenuProps
} & ComponentPropsWithoutRef<'div'>

export const SettingDropdown = (props: SettingDropdownProps) => {
  const {
    className,
    // deletedElement,
    // elementName,
    // id,
    learnPath,
    onConfirmDelete,
    onEdit,
    otherDropDownProps,
    ...restProps
  } = props

  return (
    <DropdownMenu
      trigger={
        <button className={s.trigger} type={'button'}>
          <SettingIcon />
        </button>
      }
      {...otherDropDownProps}
      {...restProps}
      className={className}
      contentProps={{ alignOffset: -5 }}
    >
      <DropdownItem>
        <Link className={s.item} to={learnPath}>
          <PlayIcon /> Learn
        </Link>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem>
        <button className={s.item} onClick={onEdit} type={'button'}>
          <EditIcon /> Edit
        </button>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem>
        <button className={s.item} onClick={onConfirmDelete} type={'button'}>
          <BinIcon /> Delete
        </button>
      </DropdownItem>
    </DropdownMenu>
  )
}
