import React, { useEffect, useReducer, useRef } from 'react';
import {
  Header,
  RightHome,
  Stories,
  CreatePost,
  SendVerification,
  SideBar,
  Post
} from '../../components';
import { useSelector } from 'react-redux';
import './style.css';
import { getAllPostsService } from '../../functions';
import postReducer from '../../reducers/postReducer';
import useFetchPosts from '../../hooks/useFetchPosts';

function Home({ setVisible, visible ,showPrev, setShowPrev}: any) {
  const middle = useRef<HTMLDivElement | null>(null);
  const initPostsState={
    loading:false,
    posts:[],
    error:''
  }
  const {  postState: { loading, posts, error }  } = useFetchPosts({ 
    setVisible,
    visible , 
    getData:getAllPostsService,
  });
  const { user } = useSelector((state: any) => ({ ...state }));
  
  // const [{loading,error,posts},dispatch]=useReducer()
  // const handleGetAllPosts=async()=>{
  //   try {
  //     dispatch({type:"POST_REQUEST"})
  //     const data = await getAllPostsService(user?.token)
  //     dispatch({type:'POST_SUCCESS',payload:data})
  //   } catch (error :any) {
  //     dispatch({type:"POST_ERROR",payload:"error.response.data.message"})
  //   }
  // }
  // useEffect(()=>{
  //   handleGetAllPosts()
  // },[])
  return (
    <div className='home'>
      <Header page='home' />
      <SideBar user={user} />
      <RightHome user={user} />
      <div className='home_middle' ref={middle}>
        {user.verified === false && <SendVerification user={user} />}
        <Stories />
        <CreatePost user={user} setVisible={setVisible} showPrev={showPrev} setShowPrev={setShowPrev} />
        {posts.map((post:any, i:number)=>{
          return <Post key={i} post={post} user={user}/>
        })}
      </div>
    </div>
  );
}

export default Home;
