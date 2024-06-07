import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu'

export type DropdownItemProps = DropdownMenuItemProps
export const DropdownItem = (props: DropdownItemProps) => {
  return <DropdownMenu.Item {...props} className={props.className} />
}
