//Временная страница для настройки запросов

import { Header } from '@/components/layouts/header'
import { Modal } from '@/components/ui/modal/modal'
import { useGetCurrentUserDataQuery } from '@/services/authApi/authApi'

import s from '@/pages/PageTemplate/pageTemplate.module.scss'

export function DecksPage() {
  const { data } = useGetCurrentUserDataQuery()
  const isAuthorized = !!data

  return (
    <div>
      <Header
        className={s.header}
        isAuthorized={isAuthorized}
        userDropdownProps={{
          avatar: data?.avatar || '',
          email: data?.email || '',
          name: data?.name || '',
        }}
      />
      <Modal modalHeader={'que'}>HJjhejr kjfnkr???</Modal>
    </div>
  )
}
