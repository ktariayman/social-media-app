import React, { useEffect, useRef, useState } from 'react';
import { EmojiClickData } from 'emoji-picker-react';
import Header from '../header';
import './style.css';
import { useMediaQuery } from 'react-responsive';
function CreateStory({ user }: any) {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState('');
  const [cursorPosition, setCursorPosition] = useState<number | null>(0);
  useEffect(() => {
    if (textRef.current && cursorPosition) {
      textRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition]);
  const query1175px = useMediaQuery({
    query: '(max-width: 1175px)'
  });
  const query1030px = useMediaQuery({
    query: '(max-width: 1030px)'
  });
  const query960px = useMediaQuery({
    query: '(max-width: 960px)'
  });
  const query885px = useMediaQuery({
    query: '(max-width: 885px)'
  });
  return (
    <div className='create-story'>
      <div className='create-story_left'>
        <div className='box1'>
          <div className='box1_header'>
            <h2>Votre Story</h2>
            <div className='small_circle'>
              <i className='settings_filled_icon'></i>
            </div>
          </div>
          <div className='box1_image'>
            <div className='profile_link circle_pdp hover1'>
              <img src={user?.picture} alt='' />
            </div>
            <h3>{user?.first_name + ' ' + user?.last_name}</h3>
          </div>
        </div>
      </div>
      <div className='create-story__right'>
        <div className='card1'>
          <img src={user?.picture} alt='' />
        </div>
        <div className='card2'>
          <img src={user?.picture} alt='' />
        </div>
      </div>
    </div>
  );
}
export default CreateStory;
