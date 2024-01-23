import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdownMenu.module.scss'

import avatar from '../../../utils/images/dropdownMenu/avatar.png'
import deleteIcon from '../../../utils/images/dropdownMenu/deleteIcon.svg'
import triggerIcon from '../../../utils/images/dropdownMenu/dropDownIcon.png'
import editIcon from '../../../utils/images/dropdownMenu/editIcon.svg'
import out from '../../../utils/images/dropdownMenu/outIcon.svg'
import playIcon from '../../../utils/images/dropdownMenu/playIcon.svg'
import user from '../../../utils/images/dropdownMenu/userIcon.svg'

export type DropdownMenuComponentProps = {}
export const DropdownMenuComponent = () => (
  // <div className={s.dropdownMenuContainer}>
  // First varian with icon
  // <DropdownMenu.Root>
  //   <DropdownMenu.Trigger asChild className={s.dropdownMenuTrigger}>
  //     <img alt={'Dropdown trigger'} src={triggerIcon} />
  //   </DropdownMenu.Trigger>
  //
  //   <DropdownMenu.Portal>
  //     <DropdownMenu.Content
  //       align={'end'}
  //       alignOffset={-2}
  //       className={s.dropdownMenuContent}
  //       sideOffset={9}
  //     >
  //       <div className={s.angle}></div>
  //       <DropdownMenu.Item className={s.dropdownMenuItem}>
  //         <img alt={'Dropdown item'} className={'dropdownIcon'} src={playIcon} />
  //         Learn
  //       </DropdownMenu.Item>
  //       <DropdownMenu.Separator className={s.dropdownMenuSeparator} />
  //       <DropdownMenu.Item className={s.dropdownMenuItem}>
  //         <img alt={'Dropdown item'} className={'dropdownIcon'} src={editIcon} />
  //         Edit
  //       </DropdownMenu.Item>
  //       <DropdownMenu.Separator className={s.dropdownMenuSeparator} />
  //       <DropdownMenu.Item className={s.dropdownMenuItem}>
  //         <img alt={'Dropdown item'} className={'dropdownIcon'} src={deleteIcon} />
  //         Delete
  //       </DropdownMenu.Item>
  //       {/*<DropdownMenu.Arrow className={s.dropdownMenuArrow} />*/}
  //     </DropdownMenu.Content>
  //   </DropdownMenu.Portal>
  // </DropdownMenu.Root>

  //Second variant with avatar
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild className={s.avatar}>
      <img alt={'Dropdown trigger'} src={avatar} />
    </DropdownMenu.Trigger>

    <DropdownMenu.Portal>
      <DropdownMenu.Content align={'end'} className={s.dropdownMenuContent} sideOffset={9}>
        <div className={s.angle}></div>
        <DropdownMenu.Item className={s.dropdownMenuItem}>
          <div className={s.userSection}>
            <img alt={'Dropdown item'} className={s.avatar} src={avatar} />
            <div className={s.userInfo}>
              <p className={s.userName}>Ivan</p>
              <p className={s.userEmail}>j&johnson@gmail.com</p>
            </div>
          </div>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className={s.dropdownMenuSeparator} />
        <DropdownMenu.Item className={s.dropdownMenuItem}>
          <img alt={'Dropdown item'} className={'dropdownIcon'} src={user} />
          My Profile
        </DropdownMenu.Item>
        <DropdownMenu.Separator className={s.dropdownMenuSeparator} />
        <DropdownMenu.Item className={s.dropdownMenuItem}>
          <img alt={'Dropdown item'} className={'dropdownIcon'} src={out} />
          Sign Out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
  // </div>
)
