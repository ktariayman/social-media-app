import Picker, { EmojiClickData } from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react';
import colorful from './colorful.png';

function EmojiPickerComponent({ text, setText, textRef, user, type2 }: any) {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<number | null>(0);
  useEffect(() => {
    if (textRef && textRef.current && cursorPosition) {
      textRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition]);
  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  const handleEmoji = ({ emoji }: EmojiClickData) => {
    const ref: any = textRef?.current;
    ref.focus();
    const start: string = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  return (
    <div className={type2 ? 'images_input' : ''}>
      <div className={!type2 ? 'flex_center' : ''}>
        <textarea
          maxLength={100}
          ref={textRef}
          value={text}
          placeholder={`think twice and write once ,${user?.first_name}`}
          onChange={handleTextAreaChange}
          className={`post_input ${type2 ? 'input2' : ''} `}
        ></textarea>
      </div>
      <div className='post_emojis_wrap'>
        {picker && (
          <div className={`comment_emoji_picker ${type2 ? 'movepicker2' : 'rlmove'}`}>
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && <img src={colorful} />}
        <i
          className={`emoji_icon_large ${type2 ? 'moveleft' : ''}`}
          onClick={() => {
            setPicker((prev) => !prev);
          }}
        ></i>
      </div>
    </div>
  );
}

export default EmojiPickerComponent;
