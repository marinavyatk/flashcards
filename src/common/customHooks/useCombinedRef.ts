import { MutableRefObject, RefCallback, useCallback } from 'react'

type Ref<T> = MutableRefObject<T> | RefCallback<T> | null | undefined

export function useCombinedRef<T>(...refs: Ref<T>[]) {
  return useCallback(
    (element: T) => {
      refs.forEach(ref => {
        if (!ref) {
          return
        }
        if (typeof ref === 'function') {
          ref(element)
        } else {
          ref.current = element
        }
      })
    },
    [refs]
  )
}
