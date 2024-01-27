import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePicture from "../../../components/profilePicture";
import Friendship from "./Friendship";
import { BeatLoader, MoonLoader } from "react-spinners";
import { useClickOutside } from "../../../hooks";
type Props = {
  profile: any
  photos: any
  othername: string
  visitor: boolean
  loading: boolean
  setShowEdit: any
  storyRef: React.RefObject<HTMLDivElement>
  openStory: boolean
  setOpenStory: (openStory: boolean) => void

}
export default function ProfielPictureInfos({
  profile,
  visitor,
  photos,
  othername,
  loading,
  setShowEdit,
  storyRef,
  openStory,
  setOpenStory
}: Props) {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const pRef = useRef(null);

  return (
    <div className="profile_img_wrap">

      {show && <ProfilePicture setShow={setShow} pRef={pRef} photos={photos} loading={loading} />}

      <div className="profile_w_left">
        <div className="profile_w_img">
          {
            loading ?
              <div className="profile_w_bg">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100%" }}>
                  <MoonLoader color="#1876f2" size={50} />
                </div>
              </div> :
              <div
                className="profile_w_bg"
                onClick={() => {
                  setOpenStory(true)
                }}
                ref={pRef}
                style={{
                  backgroundSize: "cover",
                  backgroundImage: `url(${profile.picture})`,
                  border: `${profile.lastStory == true ? '3px solid #1876f2' : '2px solid #fff'}`
                }}
              ></div>
          }
          {visitor ? <></> : loading ?
            (
              <div
                className="profile_circle"
              >
                <MoonLoader color="#1876f2" size={10} />
              </div>
            ) :

            (
              <div
                className="profile_circle hover1"
                onClick={() => setShow(true)}
              >
                <i className="camera_filled_icon"></i>
              </div>
            )}
        </div>
        {
          !loading &&
          <div className="profile_w_col">
            <div className="profile_name">
              {profile.first_name} {profile.last_name}
              <div className="othername">{othername && `(${othername})`}</div>
            </div>
            <div className="profile_friend_count">
              {profile?.friends && (
                <div className="profile_card_count">
                  {profile?.friends.length === 0
                    ? ""
                    : profile?.friends.length === 1
                      ? "1 Friend"
                      : `${profile?.friends.length} Friends`}
                </div>
              )}
            </div>
            <div className="profile_friend_imgs">
              {profile?.friends &&
                profile.friends.slice(0, 6).map((friend: any, i: any) => (
                  <Link to={`/profile/${friend.username}`} key={i}>
                    <img
                      src={friend.picture}
                      alt=""
                      style={{
                        transform: `translateX(${-i * 7}px)`,
                        zIndex: `${i}`,
                      }}
                    />
                  </Link>
                ))}
            </div>
          </div>
        }
      </div >
      {
        visitor ? (
          <Friendship friendshipp={profile?.friendship} profileid={profile._id} loading={loading} />
        ) : (
          <div className="profile_w_right">
            <div className="blue_btn" onClick={() => { navigate('/stories/create') }}>
              <img src="../../../icons/plus.png" alt="" className="invert" />
              <span>Add to story</span>
            </div >
            <div className="gray_btn" onClick={() => { setShowEdit(true) }}>
              <i className="edit_icon"></i>
              <span>Edit profile</span>
            </div>
          </div >
        )
      }



    </div >
  );
}
