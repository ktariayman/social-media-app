import { useRef, useState } from 'react';
import './style.css';
import { useClickOutside } from '../../hooks';
import PulseLoader from 'react-spinners/PulseLoader';
import EmojiPickerComponent from './emojiPicker/emojiPicker';
import AddToYourPost from './AddToYourPost';
import ImagePreview from './imagePreview';
import PostError from './postError';
import { IUser } from '../../ts/interface/user';
import usePostPopup from './usePostPopup';
type Props = {
  posts: any;
  user: IUser;
  visible: boolean;
  setVisible: (visible: boolean) => void
  setShowPrev: (showPrev: boolean) => void;
  showPrev: boolean;
  dispatch?: any;
  profile?: any;

}
function PostPopup({ dispatch, posts, setVisible, user, visible, setShowPrev, showPrev, profile }: Props) {
  const popup = useRef(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<any>(null);
  const [picker, setPicker] = useState<boolean>(false);
  const { error,
    setError,
    text,
    background,
    setBackground,
    setText,
    loading,
    images,
    setImages,
    postSubmit
  } = usePostPopup({ dispatch, user, profile, setVisible, posts })
  useClickOutside(popup, () => {
    setVisible(false);
    setShowPrev(false)
  });



  return (
    <div className='blur'>
      <div className='postBox' ref={popup}>
        {error && <PostError error={error} setError={setError} />}
        <div className='box_header'>
          <div
            className='small_circle'
            onClick={() => {
              setVisible(false);
            }}
          >
            <i className='exit_icon' ></i>
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
            <EmojiPickerComponent picker={picker} setPicker={setPicker} background={background} setBackground={setBackground} text={text} setText={setText} textRef={textRef} user={user} />
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
            textRef={textRef}
            setPicker={setPicker}
            picker={picker}
            imageInputRef={imageInputRef}
            openImagesHandler={() => {
              imageInputRef?.current.click();
            }}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} setPicker={setPicker} />
        <button className='post_submit' disabled={loading} onClick={() => { postSubmit() }}>
          {loading ? <PulseLoader color='#fff' size={5} /> : 'Post'}
        </button>
      </div>
    </div>
  );
}
export default PostPopup;
