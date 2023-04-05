import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import colorful from './colorful.png';
import useClickOutside from '../../hooks/useClickOutside';
import Picker, { EmojiClickData } from 'emoji-picker-react';
function PostPopup({ setVisible, user, visible }: any) {
  const popup = useRef(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [textValue, setTextValue] = useState('');
  const [text, setText] = useState('');
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<number | null>(0);
  useEffect(() => {
    if (textRef.current && cursorPosition) {
      textRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition]);
  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  const handleEmoji = ({ emoji }: EmojiClickData) => {
    const ref: any = textRef.current;
    ref.focus();
    const start: string = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
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
        {visible && (
          <div className='flex_center'>
            <textarea
              maxLength={100}
              ref={textRef}
              value={text}
              placeholder='think twice and write once '
              onChange={handleTextAreaChange}
              className='post_input'
            ></textarea>
          </div>
        )}
        <div className='post_emojis_wrap'>
          {picker && (
            <div className='comment_emoji_picker rlmove'>
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          <img src={colorful} />
          <i
            className='emoji_icon_large'
            onClick={() => {
              setPicker((prev) => !prev);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}
export default PostPopup;
