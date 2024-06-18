import { ReactNode } from 'react'

import { Header } from '@/components/layouts/header'
import { useGetCurrentUserDataQuery } from '@/services/authApi/authApi'

import s from '@/pages/formPages/formPage.module.scss'

type FormPageTemplateProps = { children: ReactNode }
export const FormPageTemplate = ({ children }: FormPageTemplateProps) => {
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
