import React, { useRef, useState } from 'react';
import './style.css';
import useClickOutside from '../../hooks/useClickOutside';
function PostPopup({ setVisible, user }: any) {
  const popup = useRef(null);
  const [text, setText] = useState('');
  useClickOutside(popup, () => {
    setVisible(false);
  });
  return (
    <div className='blur'>
      <div className='postBox' ref={popup}>
        <div className='box_header'>
          <div
            className='small_circle'
            onClick={() => {
              setVisible(false);
            }}
          >
            <i className='exit_icon'></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className='box_profile'>
          <img src={user.picture} alt='' className='box_profile_img' />
          <div className='box_col'>
            <div className='box_profile_name'>
              {user.first_name} {user.last_name}
            </div>
            <div className='box_privacy'>
              <img src='../../../icons/public.png' alt='' />
              <span>Public</span>
              <i className='arrowDown_icon'></i>
            </div>
          </div>
        </div>
        <div className='flex_center'>
          <textarea
            maxLength={100}
            value={text}
            placeholder='think twice and write once '
            onChange={(e) => setText(e.target.value)}
            className='post_input'
          ></textarea>
        </div>
      </div>
    </div>
  );
}
export default PostPopup;
