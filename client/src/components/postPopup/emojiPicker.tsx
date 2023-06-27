import Picker, { EmojiClickData } from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react';
import colorful from './colorful.png';

function EmojiPickerComponent({ text, setText, textRef, user, type2 ,background,setBackground}: any) {
  const [showBgs, setShowBgs] = useState(false);
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<number | null>(0);
  const bgRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (textRef && textRef.current && cursorPosition) {
      textRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition]);

  const postBackgrounds = [
    "../../../images/postbackgrounds/1.jpg",
    "../../../images/postbackgrounds/2.jpg",
    "../../../images/postbackgrounds/3.jpg",
    "../../../images/postbackgrounds/4.jpg",
    "../../../images/postbackgrounds/5.jpg",
    "../../../images/postbackgrounds/6.jpg",
    "../../../images/postbackgrounds/7.jpg",
    "../../../images/postbackgrounds/8.jpg",
    "../../../images/postbackgrounds/9.jpg",
  ];
  const backgroundHandler = (i: number) => {
    if (bgRef.current  ) {
      bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
      setBackground(postBackgrounds[i]);
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
      <div className={!type2 ? 'flex_center' : ''} ref={bgRef}>
        <textarea
          maxLength={250}
          ref={textRef}
          value={text}
          placeholder={`think twice and write once ,${user?.first_name}`}
          onChange={handleTextAreaChange}
          className={`post_input ${type2 ? 'input2' : ''} `}
          style={{
            paddingTop:`${background ? Math.abs(textRef.current.value.length  * 0.1 -30):0}%`
          }}
        ></textarea>
      </div>
      <div className='post_emojis_wrap'>
        {picker && (
          <div className={`comment_emoji_picker ${type2 ? 'movepicker2' : 'rlmove'}`}>
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && <img src={colorful} 
        onClick={()=>{setShowBgs((prev)=>!prev)}}
        />}
        {!type2 && showBgs && (
          <div className="post_backgrounds">
            <div
              className="no_bg"
              onClick={() => {removeBackground()
              }}
            ></div>
            {postBackgrounds.map((bg, i) => (
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
            setPicker((prev) => !prev);
          }}
        ></i>
      </div>
    </div>
  );
}

export default EmojiPickerComponent;
