import { useState } from 'react'

export const useModalStateHandler = <T>(defaultState: Record<T, boolean>) => {
  const [modalState, setModalState] = useState<Record<T, boolean>>(defaultState)

  const toggleModalHandler = (modalType: T, value: boolean) => {
    setModalState(prev => ({ ...prev, [modalType]: value }))
  }

  return { modalState, toggleModalHandler }
}
