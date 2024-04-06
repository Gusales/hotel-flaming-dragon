import { useSessionStorage } from './hooks/useSessionStorage.tsx'
import { HomePage } from './pages/Home.tsx'
import { LoginPage } from './pages/Login.tsx'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

export function App() {
  const { sessionValue } = useSessionStorage('user', '')
  console.log(sessionValue === '' ?  'TRUE' : 'FALSE')
  const router = createBrowserRouter([
    {
      path: '/',
      children: [
        {
          index: true,
          element: <Navigate to='/login' replace />,
        },
        {
          path: 'login',
          element: <LoginPage />
        },
        {
          path: 'home',
          element: <HomePage />
        }
      ]
    },
  ])
  return(
    <RouterProvider router={router} />
  )
}
