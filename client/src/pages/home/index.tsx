import React, { useRef } from 'react';
import Header from '../../components/header';
import SideBar from '../../components/home/sidebar';
import { useSelector } from 'react-redux';
import RightHome from '../../components/home/right';
import Stories from '../../components/home/stories';
import CreatePost from '../../components/createPost';
import PostPopup from '../../components/postPopup';
import './style.css';
import SendVerification from '../../components/home/sendVerification/sendVerification';
function Home({ setVisible, visible }: any) {
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
      </div>
    </div>
  );
}

export default Home;
