import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { Router } from '@/common/router'
import { store } from '@/services/store'

export function App() {
  return (
    <Provider store={store}>
      <Router />
      <ToastContainer
        autoClose={5000}
        closeOnClick
        draggable
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss
        pauseOnHover
        position={'bottom-right'}
        rtl={false}
        theme={'dark'}
      />
    </Provider>
  )
}
