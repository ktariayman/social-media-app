import LoggedInRoutes from './LoggedInRoutes';
import NotLoggedInRoutes from './NotLoggedInRoutes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, Login, Profile, Activate, ResetPassword } from '../pages';
import { useState } from 'react';
import { PostPopup } from '../components';
import { useSelector } from 'react-redux';

function AppRoutes() {
  const { user } = useSelector((state: any) => ({ ...state }));
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
          path: '/activate/:token',
          element: <Activate setVisible={setVisible} />
        },
        {
          path: '/profile',
          element: <Profile />
        },
        {
          path: '/changePassword',
          element: <ResetPassword />
        }
      ]
    },
    {
      path: '/',
      element: <NotLoggedInRoutes />,
      children: [
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/resetPassword',
          element: <ResetPassword />
        }
      ]
    }
  ]);
  return (
    <>
      {visible && <PostPopup setVisible={setVisible} user={user} visible={visible} />}

      <RouterProvider router={router} />
    </>
  );
}

export default AppRoutes;
