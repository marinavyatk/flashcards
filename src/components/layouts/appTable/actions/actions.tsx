import { ComponentPropsWithoutRef } from 'react'

import s from './actions.module.scss'

type ActionsProps = ComponentPropsWithoutRef<'div'>

export const Actions = (props: ActionsProps) => {
  return <div className={s.actions} {...props} />
}
