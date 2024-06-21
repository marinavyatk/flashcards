export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU')
}

export const debounce = (func: Function, handler: any, delay: number) => {
  clearTimeout(handler)

  return setTimeout(func, delay)
}
