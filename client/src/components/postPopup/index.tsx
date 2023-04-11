import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import useClickOutside from '../../hooks/useClickOutside';
import PulseLoader from 'react-spinners/PulseLoader';
import EmojiPickerComponent from './emojiPicker';
import AddToYourPost from './AddToYourPost';
import ImagePreview from './imagePreview';
function PostPopup({ setVisible, user, visible }: any) {
  const popup = useRef(null);
  const [showPrev, setShowPrev] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

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
          {user?.picture && <img src={user?.picture} alt='' className='box_profile_img' />}
          <div className='box_col'>
            <div className='box_profile_name'>
              {user?.first_name} {user?.last_name}
            </div>
            <div className='box_privacy'>
              <img src='../../../icons/public.png' alt='' />
              <span>Public</span>
              <i className='arrowDown_icon'></i>
            </div>
          </div>
        </div>
        {!showPrev ? (
          <>
            <EmojiPickerComponent text={text} setText={setText} textRef={textRef} user={user} />
          </>
        ) : (
          <ImagePreview
            text={text}
            user={user}
            setText={setText}
            showPrev={showPrev}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
            setError={setError}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button className='post_submit' disabled={loading}>
          {loading ? <PulseLoader color='#fff' size={5} /> : 'Post'}
        </button>
      </div>
    </div>
  );
}
export default PostPopup;
