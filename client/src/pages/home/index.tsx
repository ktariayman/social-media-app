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
import {usePosts} from '../../hooks';
import ListPosts from '../../components/ListPosts/ListPosts';

function Home({ setVisible, visible ,showPrev, setShowPrev}: any) {
  const middle = useRef<HTMLDivElement | null>(null);
  const {  postState: { loading, posts, error }  } = usePosts({ 
    setVisible,
    visible , 
    getData:getAllPostsService,
  });
  console.log('posts',posts);
  
  const { user } = useSelector((state: any) => ({ ...state }));
  return (
    <div className='home'>
      <Header page='home' />
      <SideBar user={user} />
      <ListPosts
      render={(post:any, i:number)=>{
         return <Post key={i} post={post} user={user}/>
      }}
      middle={middle} user={user} posts={posts} setVisible={setVisible} showPrev={showPrev} setShowPrev={setShowPrev}/>
      <RightHome user={user} />
    
    </div>
  );
}

export default Home;
