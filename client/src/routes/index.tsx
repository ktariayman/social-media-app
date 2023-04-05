import LoggedInRoutes from './LoggedInRoutes';
import NotLoggedInRoutes from './NotLoggedInRoutes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, Login, Profile } from '../pages';
import { useState } from 'react';
import PostPopup from '../components/postPopup';
import { useSelector } from 'react-redux';

function AppRoutes() {
  const { user } = useSelector((state: any) => ({ ...state }));
  const [visible, setVisible] = useState(true);
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
      {visible && <PostPopup setVisible={setVisible} user={user} />}

      <RouterProvider router={router} />
    </>
  );
}

export default AppRoutes;
