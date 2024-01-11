import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { useClickOutside } from '../../hooks';
import PulseLoader from 'react-spinners/PulseLoader';
import { createPostService, uploadImages } from '../../functions';
import PostError from '../postPopup/postError';
import dataURItoBlob from '../../helper/dataURItoBlob';
import { IUser } from '../../ts/interface/user';
import CreateStoryImagePreview from '../postPopup/createStoryImagePreview';
import PostSucess from '../postPopup/postSucess';
type Props = {
 setVisible: (v: boolean) => void;
 user: IUser;
 setShowPrev: (v: boolean) => void;
 showPrev: boolean;

}
function CreateStory({ setVisible, user, setShowPrev, showPrev }: Props) {
 const popup = useRef(null);
 const [loading, setLoading] = useState(false);
 const [text, setText] = useState('');
 const textRef = useRef<HTMLTextAreaElement>(null);
 const [images, setImages] = useState([]);
 const [error, setError] = useState('');
 const [sucess, setSucess] = useState('');
 const [background, setBackground] = useState('');
 const imageInputRef = useRef<any>(null);

 useClickOutside(popup, () => {
  setVisible(false);
  setShowPrev(false)
 });
 useEffect(() => {
  setShowPrev(true)
 }, [])
 const postSubmit = async (): Promise<void> => {
  if (images && images.length > 0) {
   await handleImagePost();
  }
 };


 const handleImagePost = async (): Promise<void> => {
  setLoading(true);
  try {
   const postImages = images.map(dataURItoBlob);
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
    setSucess('story is created successfuly');
    setTimeout(() => {
     setSucess('');
    }, 2000);
   } else {
    setError(res);
    setTimeout(() => {
     setSucess('');
    }, 2000);
   }
  } catch (error: any) {
   setError(error.message);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div style={{ width: '300px', borderRadius: '10px' }} ref={popup}>
   {error && <PostError error={error} setError={setError} />}
   {sucess && <PostSucess success={sucess} setSucess={setSucess} />}
   <CreateStoryImagePreview
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
    openImages={true}
    imageInputRef={imageInputRef}
    openImagesHandler={() => {
     imageInputRef?.current.click();
    }}
   />
   {images.length > 0 &&

    <button className='post_submit' disabled={loading} onClick={() => { postSubmit() }}>
     {loading ? <PulseLoader color='#fff' size={5} /> : 'Create Story'}
    </button>
   }
  </div>
 );
}
export default CreateStory;
