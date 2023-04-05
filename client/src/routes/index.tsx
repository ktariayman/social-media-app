import LoggedInRoutes from './LoggedInRoutes';
import NotLoggedInRoutes from './NotLoggedInRoutes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, Login, Profile } from '../pages';
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoggedInRoutes />,
    children: [
      {
        path: '/',
        element: <Home />
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
function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
