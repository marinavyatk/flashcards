import { ReactNode } from 'react'

import { Header } from '@/components/layouts/header'
import { useGetCurrentUserDataQuery } from '@/services/auth/authApi'

import s from '@/pages/PageTemplate/pageTemplate.module.scss'

type PageTemplateProps = { children: ReactNode }
export const PageTemplate = ({ children }: PageTemplateProps) => {
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
    </div>
  )
}
