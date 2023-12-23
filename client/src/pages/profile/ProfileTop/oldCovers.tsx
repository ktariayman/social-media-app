import { useRef } from "react";
import { useSelector } from "react-redux";
import { useClickOutside } from "../../../hooks";
import { IUser } from "../../../ts/interface/user";

export default function OldCovers({ photos, setCoverPicture, setShow }: any) {
   const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
   const Ref = useRef(null);
   useClickOutside(Ref, () => setShow(false));
   return (
      <div className="blur">
         <div className="postBox selectCoverBox" ref={Ref}>
            <div className="box_header">
               <div
                  className="small_circle"
                  onClick={() => {
                     setShow(false);
                  }}
               >
                  <i className="exit_icon"></i>
               </div>
               <span>Select photo</span>
            </div>
            <div className="selectCoverBox_links">
               <div className="selectCoverBox_link">Recent Photos</div>
               <div className="selectCoverBox_link">Photo Albums</div>
            </div>
            <div className="old_pictures_wrap scrollbar">
               <div className="old_pictures">
                  {photos && photos.resources && photos.resources?.filter(
                     (img: any) => img.folder === `${user.username}/cover_pictures`
                  )
                     .map((photo: any) => (
                        <img
                           src={photo.secure_url}
                           key={photo.public_id}
                           alt=""
                           onClick={() => {
                              setCoverPicture(photo.secure_url);
                              setShow(false);
                           }}
                        />
                     ))}
               </div>
               <div className="old_pictures">
                  {photos && photos.resources &&
                     photos.resources?.filter((img: any) => img.folder !== `${user.username}/post_images`)
                        .map((photo: any) => (
                           <img
                              src={photo.secure_url}
                              key={photo.public_id}
                              alt=""
                              onClick={() => {
                                 setCoverPicture(photo.secure_url);
                                 setShow(false);
                              }}
                           />
                        ))}
               </div>
            </div>
         </div>
      </div>
   );
}
