import { toast } from 'react-toastify'

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU')
}

export const handleImgError = (setEmpty: (empty: string) => void) => {
  toast.error('Something wrong with your image. Please, try to choose another one')
  setEmpty('')
}

export const returnErrorText = (error: any) => {
  if (error.status === 400) {
    return error.data.errorMessages[0].message ?? error.data.errorMessages[0]
  } else if (error.status === 401) {
    return error.data.message
  } else {
    return 'Error occurred'
  }
}

export const handleFileChange = (args: {
  cover: string
  fieldName?: string
  newFile: File | undefined
  setCover: (cover: string) => void
  setValue?: any
}) => {
  const { cover, fieldName = '', newFile, setCover, setValue } = args

  if (cover) {
    URL.revokeObjectURL(cover)
  }
  if (!newFile) {
    setCover('')
    setValue && setValue(fieldName, undefined, { shouldDirty: true })
  } else {
    setCover(URL.createObjectURL(newFile))
  }
}

type Data = { [key: string]: any }
export const prepareData = (data: any, dirtyFields: any) => {
  const updatedKeys = Object.keys(dirtyFields) as unknown as Array<keyof typeof dirtyFields>
  const dataKeys = Object.keys(data)
  const preparedData: Data = {}

  dataKeys.forEach(key => {
    if (!updatedKeys.includes(key)) {
      return
    }
    if (data[key] === undefined) {
      preparedData[key] = ''

      return
    }
    preparedData[key] = data[key]
  })

  return preparedData
}

export const handleTextChange = (
  value: string,
  maxLength: number,
  fieldName: string,
  setError: any,
  clearErrors: any
) => {
  if (value.length > maxLength) {
    setError(fieldName, {
      message: `String must contain at most ${maxLength} character(s)`,
      type: 'manual',
    })
  } else {
    clearErrors(fieldName)
  }
}
