import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { useClickOutside } from '../../hooks';
import PulseLoader from 'react-spinners/PulseLoader';
import { createPostService, uploadImages } from '../../functions';
import PostError from '../postPopup/postError';
import dataURItoBlob from '../../helper/dataURItoBlob';
import EmojiPickerComponent from '../postPopup/emojiPicker/emojiPicker';
import ImagePreview from '../postPopup/imagePreview';
import AddToYourPost from '../postPopup/AddToYourPost';
type Props = {
 setVisible: any;
 user: any;
 setShowPrev: any;
 showPrev: any;

}
function CreateStory({ setVisible, user, setShowPrev, showPrev }: Props) {
 const popup = useRef(null);
 const [loading, setLoading] = useState(false);
 const [text, setText] = useState('');
 const textRef = useRef<HTMLTextAreaElement>(null);
 const [images, setImages] = useState([]);
 const [error, setError] = useState('');
 const [background, setBackground] = useState('');
 const [picker, setPicker] = useState(false);

 useClickOutside(popup, () => {
  setVisible(false);
  setShowPrev(false)
 });

 const postSubmit = async (): Promise<void> => {
  if (background) {
   await handleBackgroundPost();
  } else if (images && images.length > 0) {
   await handleImagePost();
  } else if (text) {
   await handletextPost()
  }
 };

 const handleBackgroundPost = async (): Promise<void> => {
  try {
   console.log('[background]', [background]);
   const postBg = [background].map(dataURItoBlob);
   console.log('postBg', postBg);
   const path = `${user.username}/postImages`;
   const formData = new FormData();
   formData.append('path', path);
   postBg.forEach((background) => {
    formData.append('file', background);
   });
   const responseBackground = await uploadImages(formData, path, user.token);
   const res = await createPostService('story', responseBackground, text, null, user.id, user.token);
   console.log('resres', res);

   if (res.status === "ok") {
    setBackground('');
    setText('');
    setVisible(false);
   } else {
    setError(res);
   }
  } catch (error: any) {
   setError(error.message);
  } finally {
   setLoading(false);
  }
 };

 const handleImagePost = async (): Promise<void> => {
  setLoading(true);
  try {
   console.log('images', images);
   const postImages = images.map(dataURItoBlob);
   console.log('postImages', postImages);
   const path = `${user.username}/postImages`;
   const formData = new FormData();
   formData.append('path', path);
   postImages.forEach((image) => {
    formData.append('file', image);
   });
   const response = await uploadImages(formData, path, user.token);
   const res = await createPostService('story', null, text, response, user.id, user.token);
   if (res.status === "ok") {
    setText('');
    setImages([]);
    setVisible(false);
   } else {
    setError(res);
   }
  } catch (error: any) {
   setError(error.message);
  } finally {
   setLoading(false);
  }
 };

 const handletextPost = async (): Promise<void> => {
  setLoading(true);
  const res = await createPostService(
   'story',
   null,
   text,
   null,
   user.id,
   user.token
  );
  setLoading(false);
  if (res.status === "ok") {
   setBackground("");
   setText("");
   setVisible(false);
  } else {
   setError(res);
  }
 }
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
      backgroundImages={[background]}
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
export default CreateStory;
