import { ReactNode } from 'react'

import { Header } from '@/components/layouts/header'
import { Notification } from '@/components/ui/notification'
import { useGetCurrentUserDataQuery } from '@/services/auth/authApi'

import s from '@/pages/PageTemplate/pageTemplate.module.scss'

type PageTemplateProps = { children: ReactNode; notificationDescription?: string }

export const PageTemplate = ({ children, notificationDescription }: PageTemplateProps) => {
  const { data } = useGetCurrentUserDataQuery()
  const isAuthorized = !!data

  return (
    <div className={s.formPage}>
      <Header
        className={s.header}
        isAuthorized={isAuthorized}
        userDropdownProps={{
          avatar: data?.avatar || '',
          email: data?.email || '',
          name: data?.name || '',
        }}
      />
      {children}
      {notificationDescription && <Notification description={notificationDescription} />}
    </div>
  )
}
