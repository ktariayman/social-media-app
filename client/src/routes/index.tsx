import LoggedInRoutes from './LoggedInRoutes';
import NotLoggedInRoutes from './NotLoggedInRoutes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, Login, Profile, Activate, ResetPassword } from '../pages';
import { useEffect, useReducer, useState } from 'react';
import { PostPopup } from '../components';
import { useSelector } from 'react-redux';
import postReducer from '../reducers/postReducer';
import { getAllPostsService } from '../functions';

function AppRoutes() {
  const { user } = useSelector((state: any) => ({ ...state }));
  const [visible, setVisible] = useState(false);
  const [{loading,error,posts},dispatch]=useReducer(postReducer,{
    loading:false,
    posts:[],
    error:''
  })
  const handleGetAllPosts=async()=>{
    try {
      dispatch({type:"POST_REQUEST"})
      const data = await getAllPostsService(user?.token)
      dispatch({type:'POST_SUCCESS',payload:data})
    } catch (error :any) {
      dispatch({type:"POST_ERROR",payload:"error.response.data.message"})
    }
  }
  useEffect(()=>{
    handleGetAllPosts()
  },[])
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoggedInRoutes />,
      children: [
        {
          path: '/',
          element: <Home setVisible={setVisible} posts={posts} />
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
