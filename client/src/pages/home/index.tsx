import React, { useRef } from 'react';
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
function Home({ setVisible, visible , posts }: any) {
  const middle = useRef(null);
  const { user } = useSelector((state: any) => ({ ...state }));
  return (
    <div className='home'>
      <Header page='home' />
      <SideBar user={user} />
      <RightHome user={user} />
      <div className='home_middle' ref={middle}>
        {user.verified === false && <SendVerification user={user} />}
        <Stories />
        <CreatePost user={user} setVisible={setVisible} />
        {posts.map((post:any, i:number)=>{
          return <Post key={i} post={post} user={user}/>
        })}
      </div>
    </div>
  );
}

export default Home;
