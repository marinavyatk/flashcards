import { ComponentPropsWithoutRef } from 'react'

import DeleteIcon from '@/assets/svg/dropdownMenu/deleteIcon.svg?react'
import EditIcon from '@/assets/svg/dropdownMenu/editIcon.svg?react'
import PlayIcon from '@/assets/svg/dropdownMenu/playIcon.svg?react'
import SettingIcon from '@/assets/svg/dropdownMenu/settingIcon.svg?react'
import {
  DropdownItem,
  DropdownMenuComponent,
  DropdownSeparator,
} from '@/components/ui/dropdownMenu'
import { Typography } from '@/components/ui/typography'

import s from './settingDropdown.module.scss'

export type SettingDropdownProps = ComponentPropsWithoutRef<'div'>
export const SettingDropdown = (props: SettingDropdownProps) => {
  const { className, ...restProps } = props

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
        <Typography as={'label'} variant={'caption'}>
          Learn
        </Typography>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem className={s.item}>
        <EditIcon />
        <Typography as={'label'} variant={'caption'}>
          Edit
        </Typography>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem className={s.item}>
        <DeleteIcon />
        <Typography as={'label'} variant={'caption'}>
          Delete
        </Typography>
      </DropdownItem>
    </DropdownMenuComponent>
  )
}
