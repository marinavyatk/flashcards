import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { returnErrorText } from '@/common/commonFunctions'

export const useShowErrors = (errors: any[]) => {
  useEffect(() => {
    errors.forEach(error => {
      if (error) {
        const errorText = returnErrorText(error)

        toast.error(errorText)
      }
    })
  }, errors)
}
