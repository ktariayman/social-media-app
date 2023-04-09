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
  const [storyVisible, setStoryVisible] = useState(false);
  const { user } = useSelector((state: any) => ({ ...state }));
  return (
    <div className='home'>
      <Header page='home' />
      <SideBar user={user} />
      {!storyVisible && (
        <>
          <RightHome user={user} />
          <div className='home_middle' ref={middle}>
            {user.verified === false && <SendVerification user={user} />}

            <Stories setStoryVisible={setStoryVisible} />
            <CreatePost user={user} setVisible={setVisible} />
          </div>
        </>
      )}
      {storyVisible && <CreateStory />}
    </div>
  );
}

export default Home;
