import { useState, useEffect, useRef, useCallback } from "react";
import { useClickOutside } from "../../../hooks";
import { useSelector } from "react-redux";
import getCroppedImg from "../../../helper/getCroppedImg";
import { PulseLoader } from "react-spinners";
import { createPostService, uploadImages } from "../../../functions";
import { updateProfileCoverService } from "../../../functions/profile/updateProfileCover";
import Cropper from "react-easy-crop";
import OldCovers from "./oldCovers";
import { IUser } from "../../../ts/interface/user";

type Props = {
 cover: string
 visitor: boolean
 photos: any
}
function Cover({ cover, visitor, photos }: Props) {
 const [showCoverMenu, setShowCoverMenu] = useState(false)
 const menuRef = useRef(null)
 const [coverPicture, setCoverPicture] = useState<any>("");
 const [loading, setLoading] = useState(false);
 const [show, setShow] = useState(false);
 const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
 const refInput = useRef<any>(null);
 const cRef = useRef<any>(null);
 useClickOutside(menuRef, () => setShowCoverMenu(false));
 const [error, setError] = useState("");

 useClickOutside(menuRef, () => { setShowCoverMenu(false) })

 const handleImage = (e: any) => {
  let file = e.target.files[0];
  if (
   file.type !== "image/jpeg" &&
   file.type !== "image/png" &&
   file.type !== "image/webp" &&
   file.type !== "image/gif"
  ) {
   setError(`${file.name} format is not supported.`);
   return;
  } else if (file.size > 1024 * 1024 * 5) {
   setError(`${file.name} is too large max 5mb allowed.`);
   return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
   setCoverPicture(event.target!.result);
  };
 };


 const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
  setCroppedAreaPixels(croppedAreaPixels);
 }, []);
 const [crop, setCrop] = useState({ x: 0, y: 0 });
 const [zoom, setZoom] = useState(1);
 const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
 const getCroppedImage = useCallback(
  async (show: string) => {
   try {
    const img = await getCroppedImg(coverPicture, croppedAreaPixels);
    if (show) {
     setZoom(1);
     setCrop({ x: 0, y: 0 });
     setCoverPicture(img);
    } else {
     return img;
    }
   } catch (error) {
    console.log(error);
   }
  },
  [croppedAreaPixels]
 );
 const [width, setWidth] = useState<any>();
 const coverRef = useRef<any>(null);
 useEffect(() => {
  setWidth(coverRef.current.clientWidth);
 }, [window.innerWidth]);
 const updateCoverPicture = async () => {
  try {
   setLoading(true);
   let img = await getCroppedImage("");
   let blob = await fetch(img).then((b) => b.blob());
   const path = `${user.username}/cover_pictures`;
   let formData = new FormData();
   formData.append("file", blob);
   formData.append("path", path);
   const res = await uploadImages(formData, path, user.token);
   console.log("res", res);

   const updated_picture = await updateProfileCoverService(res[0].url, user.token);
   if (updated_picture == "ok") {
    const new_post = await createPostService(
     "coverPicture",
     null,
     null,
     res,
     user.id,
     user.token
    );
    if (new_post.status == "ok") {
     setLoading(false);
     setCoverPicture("");
     cRef.current.src = res[0].url;
    } else {
     setLoading(false);

     setError(new_post);
    }
   } else {
    setLoading(false);

    setError(updated_picture);
   }
  } catch (error) {
   setLoading(false);
   // setError(error.response.data.message);
  }
 };
 return (
  <div className="profile_cover" ref={coverRef}>
   {coverPicture && (
    <div className="save_changes_cover">
     <div className="save_changes_left">
      <i className="public_icon"></i>
      Your cover photo is public
     </div>
     <div className="save_changes_right">
      <button
       className="blue_btn opacity_btn"
       onClick={() => setCoverPicture("")}
      >
       Cancel
      </button>
      <button className="blue_btn " onClick={async () => await updateCoverPicture()}>
       {loading ? <PulseLoader color="#fff" size={5} /> : "Save changes"}
      </button>
     </div>
    </div>
   )}
   <input
    type="file"
    ref={refInput}
    hidden
    accept="image/jpeg,image/png,image/webp,image/gif"
    onChange={handleImage}
   />
   {error && (
    <div className="postError comment_error cover_error">
     <div className="postError_error">{error}</div>
     <button className="blue_btn" onClick={() => setError("")}>
      Try again
     </button>
    </div>
   )}
   {coverPicture && (
    <div className="cover_crooper">
     <Cropper
      image={coverPicture}
      crop={crop}
      zoom={zoom}
      aspect={width / 350}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
      showGrid={true}
      objectFit="horizontal-cover"
     />
    </div>
   )}
   {cover && !coverPicture && (
    <img src={cover} className="cover" alt="" ref={cRef} />
   )}
   {!visitor && (

    <div className="udpate_cover_wrapper">
     <div
      className="open_cover_update"
      onClick={() => setShowCoverMenu((prev) => !prev)}
     >
      <i className="camera_filled_icon"></i>
      Add Cover Photo
     </div>
     {showCoverMenu && (
      <div className="open_cover_menu" ref={menuRef}>
       <div
        className="open_cover_menu_item hover1"
        onClick={() => setShow(true)}

       >
        <i className="photo_icon"></i>
        Select Photo
       </div>
       <div
        className="open_cover_menu_item hover1"
        onClick={() => refInput.current.click()}
       >
        <i className="upload_icon"></i>
        Upload Photo
       </div>
      </div>
     )}
    </div>
   )}
   {show && (
    <OldCovers
     photos={photos}
     setCoverPicture={setCoverPicture}
     setShow={setShow}
    />
   )}
  </div>
 );
}
export default Cover;