import { ReactNode } from 'react'

import { Header } from '@/components/layouts/header'
import { Notification } from '@/components/ui/notification'
import { useGetCurrentUserDataQuery } from '@/services/auth/authApi'

import s from '@/components/layouts/pageTemplate/pageTemplate.module.scss'

type PageTemplateProps = { children: ReactNode; notificationDescription?: string }

export const PageTemplate = ({ children, notificationDescription }: PageTemplateProps) => {
  const { data } = useGetCurrentUserDataQuery()
  const isAuthorized = !!data

  return (
    <div className={s.template}>
      <Header
        className={s.header}
        isAuthorized={isAuthorized}
        userDropdownProps={{
          avatar: data?.avatar || '',
          email: data?.email || '',
          name: data?.name || '',
        }}
      />
      <div className={s.children}>{children}</div>

      {notificationDescription && <Notification description={notificationDescription} />}
    </div>
  )
}
