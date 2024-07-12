import { toast } from 'react-toastify'

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU')
}

export const handleImgError = setEmpty => {
  toast.error('Something wrong with your image. Please, try to choose another one')
  setEmpty()
}

export const returnErrorText = (error: any) => {
  if (error.status === 400) {
    return error.data.errorMessages[0].message
  } else if (error.status === 401) {
    return error.data.message
  } else {
    return 'Error occurred'
  }
}
