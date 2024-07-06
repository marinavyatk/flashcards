import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { PageNotFound } from '@/pages/404/404'
import { DeckPage } from '@/pages/deckPage/deckPage'
import { CheckEmailPage } from '@/pages/formPages/checkEmailPage'
import { EditProfilePage } from '@/pages/formPages/editProfilePage'
import { ForgotPasswordPage } from '@/pages/formPages/forgotPasswordPage'
import { SignInPage } from '@/pages/formPages/signInPage'
import { SignUpPage } from '@/pages/formPages/signUpPage'
import { LearnPage } from '@/pages/learnPage/learnPage'
import { MainPage } from '@/pages/mainPage/mainPage'
import { useGetCurrentUserDataQuery } from '@/services/auth/authApi'

export const routes = {
  checkEmail: '/check-email',
  createNewPassword: '/create-new-password',
  deck: '/decks/:deckId',
  editProfile: '/edit-profile',
  forgotPassword: '/forgot-password',
  learn: 'learn/:deckId/:cardId',
  main: '/',
  pageNotFound: '/*',
  signIn: '/sign-in',
  signUp: '/sign-up',
}

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: routes.signIn,
  },
  {
    element: <SignUpPage />,
    path: routes.signUp,
  },
  {
    element: <ForgotPasswordPage />,
    path: routes.forgotPassword,
  },
  {
    element: <CheckEmailPage />,
    path: routes.checkEmail,
  },
  {
    element: <PageNotFound />,
    path: routes.pageNotFound,
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <MainPage />,
    path: routes.main,
  },
  {
    element: <DeckPage />,
    path: routes.deck,
  },
  {
    element: <EditProfilePage />,
    path: routes.editProfile,
  },
  {
    element: <LearnPage />,
    path: routes.learn,
  },
]

export const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])

function PrivateRoutes() {
  const { data: userData, isLoading } = useGetCurrentUserDataQuery()

  if (isLoading) {
    return <div>...Loading...</div>
  }

  if (userData) {
    const isAuthenticated = !!userData

    return isAuthenticated ? <Outlet /> : <Navigate to={routes.signIn} />
  }
}

export function Router() {
  return <RouterProvider router={router} />
}
