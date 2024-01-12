import { useRef, useState } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { useClickOutside } from "../../hooks"
import UpdateProfilePicture from "./UpdateProfilePicture";
import { IUser } from "../../ts/interface/user";
export default function ProfilePicture({ username, setShow, pRef, photos }: any) {
  const popup = useRef(null);
  const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
  useClickOutside(popup, () => setShow(false));
  const refInput = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>("");
  const [error, setError] = useState("");

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    if (!file) return
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
      setImage(event.target!.result);
    };
  };


  return (
    <div className="blur">
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/jpeg,image/png,image/webp,image/gif"
      />
      <div className="postBox pictureBox" >
        <div className="box_header">
          <div className="small_circle" onClick={() => { setShow('') }}>
            <i className="exit_icon"></i>
          </div>
          <span>Update profile picture</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button
              className="light_blue_btn"
              onClick={() => refInput.current!.click()}
            >
              <i className="plus_icon filter_blue"></i>
              Upload photo
            </button>
            <button className="gray_btn">
              <i className="frame_icon"></i>
              Add frame
            </button>
          </div>
        </div>
        {error && (
          <div className="postError comment_error">
            <div className="postError_error">{error}</div>
            <button className="blue_btn" onClick={() => setError("")}>
              Try again
            </button>
          </div>
        )}
        <div className="old_pictures_wrap scrollbar">
          <h4>your profile pictures</h4>
          <div className="old_pictures">
            {photos && photos.resources && photos.resources?.filter(
              (img: any) => img.folder === `${user.username}/profile_pictures`
            )
              .map((photo: any) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
          <h4>other pictures</h4>
          <div className="old_pictures">
            {photos && photos.resources && photos.resources?.filter(
              (img: any) => img.folder !== `${user.username}/profile_pictures`
            )
              .map((photo: any) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
        </div>
      </div>
      {image && <UpdateProfilePicture
        setImage={setImage}
        image={image}
        pRef={pRef}
        setError={setError}
        setShow={setShow}
      />}

    </div>
  );
}
