import LoggedInRoutes from './routes/LoggedInRoutes';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import { PostPopup } from './components';
import { useSelector } from 'react-redux';
import { getAllPostsService } from './functions';
import { usePosts } from './hooks';
import { useRouter } from './routes/useRouter';

function AppRoutes() {
  const { user } = useSelector((state: any) => ({ ...state }));
  const { darkTheme } = useSelector((state: any) => ({ ...state }));
  const [visible, setVisible] = useState(false);
  const [showPrev, setShowPrev] = useState<boolean>(false);
  const { dispatch, postState } = usePosts({
    setVisible,
    getData: getAllPostsService,
    visible
  })
  const { router } = useRouter({ setShowPrev, showPrev, setVisible, postState })
  return (
    <div className={`${darkTheme ? "dark" : ''}`} style={{ minHeight: "100vh" }}>
      {visible && <PostPopup setVisible={setVisible} user={user} visible={visible} showPrev={showPrev} setShowPrev={setShowPrev} posts={postState.posts} dispatch={dispatch} />}

      <RouterProvider router={router} />
    </div>
  );
}

export default AppRoutes;
