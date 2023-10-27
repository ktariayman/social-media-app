import React, { useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { Header } from '../../components';
import CreateStory from '../../components/createStory';
import CreateStoriesLeft from './CreateStoriesLeft';
function CreateStories() {
  const { user } = useSelector((state: any) => ({ ...state }));
  const [visible, setVisible] = useState(false);
  const [showPrev, setShowPrev] = useState(false);

  return (
    <>
      <Header page='home' />
      <div className='friends'>

        <CreateStoriesLeft setVisible={setVisible} />
        {visible && <CreateStory user={user} setVisible={setVisible} setShowPrev={setShowPrev} showPrev={showPrev} />}
      </div>
    </>
  );
}

export default CreateStories;