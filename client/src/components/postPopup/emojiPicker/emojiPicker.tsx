import Picker, { EmojiClickData } from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from '../../../svg';
import postBackgroundsData from './emojiPickerData';

function EmojiPickerComponent({ picker, setPicker, text, setText, textRef, user, type2, background, setBackground, imageInputRef }: any) {
  const [showBgs, setShowBgs] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<number | null>(0);
  const bgRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (textRef && textRef.current && cursorPosition) {
      textRef.current.selectionEnd = cursorPosition;
    }


  }, [cursorPosition]);

  const backgroundHandler = (i: number) => {
    if (bgRef.current) {
      bgRef.current.style.backgroundImage = `url(${postBackgroundsData[i]})`;
      setBackground(postBackgroundsData[i]);
      bgRef.current.classList.add("bgHandler");
    }
  };

  const removeBackground = () => {
    if (bgRef.current) {
      bgRef.current.style.backgroundImage = "";
      setBackground("");
      bgRef.current.classList.remove("bgHandler");
    }
  };

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  const handleEmoji = ({ emoji }: EmojiClickData) => {
    const ref: any = textRef?.current
    ref.focus();
    const start: string = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  return (
    <div className={type2 ? 'images_input' : ''} style={{ marginBottom: '10px' }}>
      <div className={!type2 ? 'flex_center' : ''} ref={bgRef}>
        <textarea
          maxLength={250}
          ref={textRef}
          value={text}
          placeholder={`think twice and write once ,${user?.first_name}`}
          onChange={handleTextAreaChange}
          className={`post_input ${type2 ? 'input2' : ''} `}
          style={{
            paddingTop: `${background ? Math.abs(textRef.current.value.length * 0.1 - 30) : 0}%`
          }}
        ></textarea>
      </div>
      <div className='post_emojis_wrap'>
        {picker && (
          <div className={`comment_emoji_picker ${type2 ? 'movepicker2' : 'rlmove'}`}>
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && !showBgs && <img alt='' src='"../../../images/postbackgrounds/colorful.png'
          onClick={() => { setShowBgs((prev) => !prev) }}
        />}
        {!type2 && showBgs && <div
          onClick={() => { setShowBgs((prev) => !prev) }}
          className='rotate-180'
          style={{ background: "#444", padding: 0, height: 'auto' }}
        >
          <ArrowRight color="#eee" />
        </div>}
        {!type2 && showBgs && (
          <div className="post_backgrounds">
            <div
              className="no_bg"
              onClick={() => {
                removeBackground()
              }}
            ></div>
            {postBackgroundsData.map((bg: string, i: number) => (
              <img
                src={bg}
                key={i}
                alt=""
                onClick={() => {
                  backgroundHandler(i);
                }}
              />
            ))}
          </div>
        )}
        <i
          className={`emoji_icon_large ${type2 ? 'moveleft' : ''}`}
          onClick={() => {
            setPicker((prev: any) => !prev);
          }}
        ></i>
      </div>
    </div>
  );
}

export default EmojiPickerComponent;
