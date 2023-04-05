import LoggedInRoutes from './LoggedInRoutes';
import NotLoggedInRoutes from './NotLoggedInRoutes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, Login, Profile } from '../pages';
import { useState } from 'react';

function AppRoutes() {
  const [visible, setVisible] = useState(false);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoggedInRoutes />,
      children: [
        {
          path: '/',
          element: <Home setVisible={setVisible} />
        },
        {
          path: '/profile',
          element: <Profile />
        }
      ]
    },
    {
      path: '/',
      element: <NotLoggedInRoutes />,
      children: [
        {
          path: '/',
          element: <Login />
        }
      ]
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default AppRoutes;
