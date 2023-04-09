import React, { useRef, useState } from 'react';
import {
  Header,
  RightHome,
  Stories,
  CreatePost,
  SendVerification,
  SideBar,
  CreateStory
} from '../../components';
import { useSelector } from 'react-redux';
import './style.css';
function Home({ setVisible, visible }: any) {
  const middle = useRef(null);
  const [storyVisible, setStoryVisible] = useState(true);
  const { user } = useSelector((state: any) => ({ ...state }));
  return (
    <div className='home'>
      <Header page='home' />
      <SideBar user={user} />
      <RightHome user={user} />
      <div className='home_middle' ref={middle}>
        {user.verified === false && <SendVerification user={user} />}

        <Stories setStoryVisible={setStoryVisible} />
        <CreatePost user={user} setVisible={setVisible} />
      </div>
    </div>
  );
}

export default Home;
