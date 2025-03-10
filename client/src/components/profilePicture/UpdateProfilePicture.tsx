import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helper/getCroppedImg"
import { createPostService, uploadImages } from "../../functions";
import updateProfilePictureService from "../../functions/profile/updateProfilePicture";
import Cookies from "js-cookie";
import { IUser } from "../../ts/interface/user";
function UpdateProfilePicture({
 setImage,
 image,
 pRef,
 setError,
 setShow
}: any) {
 const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
 const dispatch = useDispatch();
 const [description, setDescription] = useState("");
 const [crop, setCrop] = useState({ x: 0, y: 0 });
 const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
  setCroppedAreaPixels(croppedAreaPixels);
 }, []);
 const [loading, setLoading] = useState(false);
 const [zoom, setZoom] = useState(1);
 const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
 const slider = useRef<any>(null);
 const zoomIn = () => {
  slider.current.stepUp();
  setZoom(slider.current.value);
 };
 const zoomOut = () => {
  slider.current.stepDown();
  setZoom(slider.current.value);
 };
 const getCroppedImage = useCallback(
  async (show: string) => {
   try {
    const img = await getCroppedImg(image, croppedAreaPixels);
    if (show) {
     setZoom(1);
     setCrop({ x: 0, y: 0 });
     setImage(img);
    } else {
     return img;
    }
   } catch (error) {
    console.log(error);
   }
  },
  [croppedAreaPixels]
 );
 const updateProfielPicture = async () => {
  try {
   setLoading(true);
   let img = await getCroppedImage("");
   let blob = await fetch(img).then((b) => b.blob());
   const path = `${user.username}/profile_pictures`;
   let formData = new FormData();
   formData.append("file", blob);
   formData.append("path", path);
   const res = await uploadImages(formData, path, user.token);

   const updated_picture = await updateProfilePictureService(
    res[0].url,
    user.token
   );
   if (updated_picture === "ok") {
    const new_post = await createPostService(
     "profilePicture",
     null,
     description,
     res,
     user.id,
     user.token
    );
    if (new_post.status === "ok") {
     setLoading(false);
     setImage("");
     pRef.current.style.backgroundImage = `url(${res[0].url})`;
     Cookies.set(
      "user",
      JSON.stringify({
       ...user,
       picture: res[0].url,
      })
     );
     dispatch({
      type: 'UPDATE_PROFILE_PICTURE',
      payload: {
       ...user,
       picture: res[0].url,
      },
     });
     setShow(false);
    } else {
     setLoading(false);

     setError(new_post);
    }
   } else {
    setLoading(false);
    setError(updated_picture);
   }
  } catch (error: any) {
   setLoading(false);
   setError(error.response.data.message);
  }
 }
 return (
  <div className="postBox update_img" >
   <div className="box_header">
    <div className="small_circle" onClick={() => { setImage('') }}>
     <i className="exit_icon"></i>
    </div>
    <span>Update profile picture</span>
   </div>
   <div className="update_image_desc">
    <textarea
     placeholder="Description"
     value={description}
     onChange={(e) => setDescription(e.target.value)}
     className="textarea_blue details_input"
    ></textarea>
   </div>

   <div className="update_center">
    <div className="crooper">
     <Cropper
      image={image}
      crop={crop}
      zoom={zoom}
      aspect={1 / 1}
      cropShape="round"
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
      showGrid={false}
     />
    </div>
    <div className="slider">
     <div className="slider_circle hover1" onClick={() => zoomOut()}>
      <i className="minus_icon"></i>
     </div>
     <input
      type="range"
      min={1}
      max={3}
      step={0.2}
      ref={slider}
      value={zoom}
      onChange={(e) => setZoom(+e.target.value)}
     />
     <div className="slider_circle hover1" onClick={() => zoomIn()}>
      <i className="plus_icon"></i>
     </div>
    </div>

   </div>
   <div className="flex_up">
    <div className="gray_btn" onClick={() => getCroppedImage("show")}>
     <i className="crop_icon"></i>Crop photo
    </div>
    <div className="gray_btn">
     <i className="temp_icon"></i>Make Temporary
    </div>
   </div>
   <div className="flex_p_t">
    <i className="public_icon"></i>
    Your profile picture is public
   </div>
   <div className="update_submit_wrap">
    <div className="blue_link" onClick={() => setImage("")}>
     Cancel
    </div>
    <button
     className="blue_btn"
     disabled={loading}
     onClick={() => updateProfielPicture()}
    >
     {loading ? <PulseLoader color="#fff" size={5} /> : "Save"}
    </button>
   </div>
  </div>
 );
}
export default UpdateProfilePicture;
