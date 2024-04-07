import { useSessionStorage } from './hooks/useSessionStorage.tsx'
import { HomePage } from './pages/Home.tsx'
import { LoginPage } from './pages/Login.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

export function App() {
  const { sessionValue } = useSessionStorage('user', '')
  const router = createBrowserRouter([
    {
      path: '/',
      children: [
        {
          index: true,
          element: sessionValue === '' ? <LoginPage /> : <HomePage />,
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
