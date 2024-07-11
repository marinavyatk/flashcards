import s from './loader.module.scss'

export const Loader = () => {
  return <span className={s.loader}></span>
}

export const PageLoader = () => {
  return (
    <div className={s.loaderContainer}>
      <Loader />
    </div>
  )
}
