import { useState } from "react";
import { createPostService, uploadImages } from "../../functions";
import dataURItoBlob from "../../helper/dataURItoBlob";

const usePostPopup = ({ dispatch, user, profile, setVisible, posts }: any) => {
 const [loading, setLoading] = useState<boolean>(false);
 const [text, setText] = useState<string>('');
 const [images, setImages] = useState([]);
 const [error, setError] = useState<string>('');
 const [background, setBackground] = useState<string>('');



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
   const res = await createPostService(null, background, text, null, user.id, user.token);
   if (res.status === "ok") {
    dispatch({ type: profile ? 'PROFILE_POSTS' : 'POST_SUCCESS', payload: [res.data, ...posts] })
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
   const postImages = images.map(dataURItoBlob);
   const path = `${user.username}/postImages`;
   const formData = new FormData();
   formData.append('path', path);
   postImages.forEach((image) => {
    formData.append('file', image);
   });
   const response = await uploadImages(formData, path, user.token);
   const res = await createPostService(null, null, text, response, user.id, user.token);
   if (res.status === "ok") {
    dispatch({ type: profile ? 'PROFILE_POSTS' : 'POST_SUCCESS', payload: [res.data, ...posts] })
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
   null,
   null,
   text,
   null,
   user.id,
   user.token
  );
  setLoading(false);
  if (res.status === "ok") {
   dispatch({ type: profile ? 'PROFILE_POSTS' : 'POST_SUCCESS', payload: [res.data, ...posts] })
   setBackground("");
   setText("");
   setVisible(false);
  } else {
   setError(res);
  }
 }
 return {
  postSubmit,
  loading,
  setLoading,
  text,
  setText,
  images,
  setImages,
  error,
  setError,
  background,
  setBackground,
 }
};

export default usePostPopup;
