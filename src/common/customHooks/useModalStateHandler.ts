import { useState } from 'react'

export const useModalStateHandler = <T extends string>(defaultState: Record<T, any>) => {
  const [modalState, setModalState] = useState<Record<T, any>>(defaultState)

  const toggleModalHandler = (modalType: T, value: any) => {
    setModalState(prev => ({ ...prev, [modalType]: value }))
  }

  return { modalState, toggleModalHandler }
}
