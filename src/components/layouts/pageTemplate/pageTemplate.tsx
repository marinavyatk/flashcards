import { ReactNode } from 'react'
import { useOutletContext } from 'react-router-dom'

import { Header } from '@/components/layouts/header'
import { PageLoader } from '@/components/ui/loader/loader'
import { LoaderLine } from '@/components/ui/loaderLine/loaderLine'
import { UserData } from '@/services/auth/authApiTypes'

import 'react-toastify/dist/ReactToastify.css'

import s from '@/components/layouts/pageTemplate/pageTemplate.module.scss'

type PageTemplateProps = {
  children: ReactNode
  isLoading?: boolean
  showTopLoader?: boolean
}

export const PageTemplate = ({ children, isLoading, showTopLoader }: PageTemplateProps) => {
  const userData: UserData = useOutletContext()
  const isAuthorized = !!userData

  return (
    <>
      <div className={s.headerContainer}>
        <Header
          className={s.header}
          isAuthorized={isAuthorized}
          userDropdownProps={{
            avatar: userData?.avatar || '',
            email: userData?.email || '',
            name: userData?.name || '',
          }}
        />
        {showTopLoader && <LoaderLine className={s.loaderLine} />}
      </div>
      {isLoading ? <PageLoader /> : <div className={s.children}>{children}</div>}
    </>
  )
}
