import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Profile, Activate, ResetPassword, Friends, Saved } from '../pages';
import CreateStories from '../pages/stories';
import Suggestions from '../pages/friends/Suggestions/Suggestions';
import Birthdays from '../pages/friends/Birthdays/Birthdays';
import NotFoundPage from '../pages/notFound/NotFound';
import Download from '../pages/Download';
import LoggedInRoutes from "./LoggedInRoutes";
import NotLoggedInRoutes from "./NotLoggedInRoutes";
type Props = {
  setVisible: (visible: boolean) => void;
  showPrev: boolean
  setShowPrev: (showPrev: boolean) => void;
  postState: any
}
export const useRoutes = ({ setVisible, showPrev, setShowPrev, postState }: Props) => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoggedInRoutes />,
      children: [
        {
          path: '/',
          element: <Home setVisible={setVisible} showPrev={showPrev} setShowPrev={setShowPrev} postState={postState} />
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
          path: '/profile/:username',
          element: <Profile />
        },
        {
          path: '/friends',
          element: <Friends />
        },
        {
          path: '/friends/:type',
          element: <Friends />
        },
        {
          path: '/friends/suggestions',
          element: <Suggestions />
        },
        {
          path: '/friends/birthdays',
          element: <Birthdays />
        },
        {
          path: '/changePassword',
          element: <ResetPassword />
        },
        {
          path: '/saved',
          element: <Saved />
        },
        {
          path: '/stories/create',
          element: <CreateStories />
        },
        {
          path: '/download',
          element: <Download />
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
    },
    {
      path: '*',
      element: <NotFoundPage />
    }
  ]);
  return {
    router
  }
}