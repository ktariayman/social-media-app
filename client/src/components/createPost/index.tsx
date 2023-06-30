import React from 'react';

import { Feeling, LiveVideo, Photo } from '../../svg';
import './style.css';
import { CreatePostIcon } from './createPostIcon';


function CreatePost({ user, setVisible, profile ,showPrev,setShowPrev}: any) {
  return (
    <div className='createPost'>
      <div className='createPost_header'>
        <img src={user?.picture} alt='' />
        <div
          className='open_post hover2'
          onClick={() => {
            setVisible(true);
          }}
        >
          What's on your mind, {user?.first_name}
        </div>
      </div>
      <div className='create_splitter'></div>
      <div className='createPost_body'>
      <CreatePostIcon>
        <LiveVideo color='#f3425f' />
        Live Video
      </CreatePostIcon>
      <CreatePostIcon onClick={() => {
            setVisible(true);
            setShowPrev(true)
          }}>
      <div  >
        <Photo color='#4bbf67' />
     
        Photo/Video
        </div>
      </CreatePostIcon>

      {profile ? (
      <CreatePostIcon>
        <i className='lifeEvent_icon'></i>
        Life Event
      </CreatePostIcon>
      ) : (
      <CreatePostIcon>
        <Feeling color='#f7b928' />
        Feeling/Activity

      </CreatePostIcon>

      )}
      </div>
    </div>
  );
}
export default CreatePost;
