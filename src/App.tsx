import { Provider } from 'react-redux'

import { Router } from '@/common/router'
import { store } from '@/services/store'

export function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}
