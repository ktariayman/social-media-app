import React from "react";
import { HashLoader } from "react-spinners";
import PplYouMayKnow from "./PeoplesYouMayKnow";
import { Link } from "react-router-dom";
import ProfileDetails from "../../../components/profileDetails/profilteDetails";
import Photos from "./Photos";
import Friends from "./Friends";
import { CreatePost, Post } from "../../../components";
import GridPosts from "./gridPosts";
import { ProfileState } from "../../../reducers/profileReducer";
import { useSelector } from "react-redux";
import useNotFriends from "../../../hooks/useNotFriends";
import { IUser } from "../../../ts/interface/user";
type Props = {
 visitor: boolean
 profileState: ProfileState
 ref: React.RefObject<HTMLDivElement>
 photos: any
 setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
 setOthername: React.Dispatch<React.SetStateAction<string>>
 showEdit: boolean
 userName: string
 setVisible: React.Dispatch<React.SetStateAction<boolean>>
}
const ProfileBottom = ({ visitor, profileState, ref, photos, setOthername, setShowEdit, showEdit, setVisible, userName }: Props) => {
 const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
 const { notFriends } = useNotFriends()
 return (
  <div className="profile_bottom">
   <div className="profile_container">
    <div className="bottom_container">
     {!visitor && notFriends.length !== 0 &&
      <PplYouMayKnow />
     }
     <div
      className="profile_grid"
     >
      <ProfileLeft
       token={user.token}
       setOthername={setOthername}
       photos={photos}
       profileState={profileState}
       ref={ref}
       setShowEdit={setShowEdit}
       setVisible={setVisible}
       showEdit={showEdit}
       userName={userName}
       visitor={visitor}
      />
      <ProfileRight
       profileState={profileState}
       setVisible={setVisible}
       token={user.token}
       user={user}
       visitor={visitor}
      />
     </div>
    </div>
   </div>
  </div>
 )
};

export default ProfileBottom;



type ProfileLeftProps = {
 visitor: boolean
 profileState: ProfileState
 ref: React.RefObject<HTMLDivElement>
 photos: any
 setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
 setOthername: React.Dispatch<React.SetStateAction<string>>
 showEdit: boolean
 userName: string
 token: string
 setVisible: React.Dispatch<React.SetStateAction<boolean>>
}
const ProfileLeft = ({ token, visitor, profileState, ref, photos, setOthername, setShowEdit, showEdit, userName }: ProfileLeftProps) => {
 return (
  <div className="profile_left" ref={ref}>
   {profileState.loading ? (
    <>
     <div className="profile_card">
      <div className="profile_card_header">Intro</div>
      <div className="sekelton_loader">
       <HashLoader color="#1876f2" />
      </div>
     </div>
     <div className="profile_card">
      <div className="profile_card_header">
       Photos
       <div className="profile_header_link">
        See all photos
       </div>
      </div>
      <div className="sekelton_loader">
       <HashLoader color="#1876f2" />
      </div>
     </div>
     <div className="profile_card" >
      <div className="profile_card_header">
       Friends
       <button className="profile_header_link" >
        <Link to="/" className="profile_menu_active">
         See all friends
        </Link>

       </button>
      </div>
      <div className="sekelton_loader">
       <HashLoader color="#1876f2" />
      </div>
     </div>
    </>
   ) : (
    <>
     <ProfileDetails
      oldDetails={profileState.profile.details}
      visitor={visitor}
      setOthername={setOthername}
      showEdit={showEdit}
      setShowEdit={setShowEdit}
     />
     <Photos
      username={userName}
      token={token}
      photos={photos}
     />
     <Friends friends={profileState.profile.friends} />
    </>
   )}
  </div>
 )
};


type ProfileRightProps = {
 visitor: boolean
 profileState: ProfileState
 user: any
 token: string
 setVisible: React.Dispatch<React.SetStateAction<boolean>>
}
const ProfileRight = ({ user, profileState, setVisible, visitor }: ProfileRightProps) => {
 return (
  <div className="profile_right">
   {!visitor && (
    <CreatePost user={user} profile setVisible={setVisible} loading={profileState.loading} />
   )}
   <GridPosts />
   {profileState.loading ? (
    <div className="sekelton_loader">
     <HashLoader color="#1876f2" />
    </div>
   ) : (
    <div className="posts">
     {profileState.profile.posts && profileState.profile.posts.length ? (
      profileState.profile.posts.map((post: any) => (
       <Post post={post} user={user} key={post._id} profile profile_picture={profileState.profile.picture} token={user.token} />
      ))
     ) : (
      <div className="no_posts">No posts available</div>
     )}
    </div>
   )}
  </div>
 )
};