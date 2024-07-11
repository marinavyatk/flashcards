import { ReactNode } from 'react'

import { Header } from '@/components/layouts/header'
import { PageLoader } from '@/components/ui/loader/loader'
import { LoaderLine } from '@/components/ui/loaderLine/loaderLine'
import { Notification } from '@/components/ui/notification'
import { useGetCurrentUserDataQuery } from '@/services/auth/authApi'

import s from '@/components/layouts/pageTemplate/pageTemplate.module.scss'

type PageTemplateProps = {
  children: ReactNode
  isLoading?: boolean
  notificationDescription?: string
  showTopLoader?: boolean
}

export const PageTemplate = ({
  children,
  isLoading,
  notificationDescription,
  showTopLoader,
}: PageTemplateProps) => {
  const { data } = useGetCurrentUserDataQuery()
  const isAuthorized = !!data

  return (
    <div className={s.template}>
      <div className={s.fixingContainer}>
        <div className={s.headerContainer}>
          <Header
            className={s.header}
            isAuthorized={isAuthorized}
            userDropdownProps={{
              avatar: data?.avatar || '',
              email: data?.email || '',
              name: data?.name || '',
            }}
          />
          {showTopLoader && <LoaderLine className={s.loaderLine} />}
        </div>
      </div>

      {isLoading ? <PageLoader /> : <div className={s.children}>{children}</div>}
      {notificationDescription && <Notification description={notificationDescription} />}
    </div>
  )
}
