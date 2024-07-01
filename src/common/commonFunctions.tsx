export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU')
}

export const handleImgError = setEmpty => {
  alert('Something wrong with your image. Please, try to choose another one')
  setEmpty()
}
