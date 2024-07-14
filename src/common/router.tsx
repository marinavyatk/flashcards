import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { PageLoader } from '@/components/ui/loader/loader'
import { PageNotFound } from '@/pages/404/404'
import { DeckPage } from '@/pages/deckPage/deckPage'
import { CheckEmailPage } from '@/pages/formPages/checkEmailPage'
import { CreateNewPasswordPage } from '@/pages/formPages/createNewPasswordPage'
import { EditProfilePage } from '@/pages/formPages/editProfilePage'
import { ForgotPasswordPage } from '@/pages/formPages/forgotPasswordPage'
import { SignInPage } from '@/pages/formPages/signInPage'
import { SignUpPage } from '@/pages/formPages/signUpPage'
import { LearnPage } from '@/pages/learnPage/learnPage'
import { MainPage } from '@/pages/mainPage/mainPage'
import { useGetCurrentUserDataQuery } from '@/services/auth/authApi'

export const routes = {
  common: {
    pageNotFound: '/*',
  },
  private: {
    deck: '/decks/:deckId',
    editProfile: '/edit-profile',
    learn: '/decks/:deckId/learn',
    main: '/',
  },
  public: {
    checkEmail: '/check-email',
    createNewPassword: '/create-new-password',
    forgotPassword: '/forgot-password',
    signIn: '/sign-in',
    signUp: '/sign-up',
  },
}

const commonRoutes = [
  {
    element: <PageNotFound />,
    path: routes.common.pageNotFound,
  },
]

const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: routes.public.signIn,
  },
  {
    element: <SignUpPage />,
    path: routes.public.signUp,
  },
  {
    element: <ForgotPasswordPage />,
    path: routes.public.forgotPassword,
  },
  {
    element: <CheckEmailPage />,
    path: routes.public.checkEmail,
  },
  {
    element: <CreateNewPasswordPage />,
    path: routes.public.createNewPassword,
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <MainPage />,
    path: routes.private.main,
  },
  {
    element: <DeckPage />,
    path: routes.private.deck,
  },
  {
    element: <EditProfilePage />,
    path: routes.private.editProfile,
  },
  {
    element: <LearnPage />,
    path: routes.private.learn,
  },
]

export const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  {
    children: publicRoutes,
    element: <PublicRoutes />,
  },
  ...commonRoutes,
])

function PrivateRoutes() {
  const { data: userData, isError, isLoading } = useGetCurrentUserDataQuery()

  if (isLoading) {
    return <PageLoader />
  }

  if (!isError) {
    const isAuthenticated = !isError

    return isAuthenticated ? <Outlet context={userData} /> : <Navigate to={routes.public.signIn} />
  }
}

function PublicRoutes() {
  const { data: userData, isLoading } = useGetCurrentUserDataQuery()

  if (isLoading) {
    return <PageLoader />
  }
  if (!userData) {
    return <Outlet context={userData} />
  }

  return <Navigate to={routes.private.main} />
}

export function Router() {
  return <RouterProvider router={router} />
}
