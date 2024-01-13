import { RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import { PostPopup } from './components';
import { useSelector } from 'react-redux';
import { getAllPostsService } from './functions';
import { usePosts } from './hooks';
import { useRoutes } from './routes/useRoutes';
import { IUser } from './ts/interface/user';

function AppRoutes() {
  const { user, darkTheme }: { user: IUser, darkTheme: boolean } = useSelector((state: any) => ({ ...state }));
  const [visible, setVisible] = useState(false);
  const [showPrev, setShowPrev] = useState<boolean>(false);
  const { dispatch, postState } = usePosts({
    setVisible,
    getData: getAllPostsService,
    visible
  })
  const { router } = useRoutes({ setShowPrev, showPrev, setVisible, postState })
  return (
    <div className={`${darkTheme ? "dark" : ''}`} style={{ height: "auto" }}>
      {visible && <PostPopup setVisible={setVisible} user={user} visible={visible} showPrev={showPrev} setShowPrev={setShowPrev} posts={postState.posts} dispatch={dispatch} />}
      <RouterProvider router={router} />
    </div>
  );
}

export default AppRoutes;
