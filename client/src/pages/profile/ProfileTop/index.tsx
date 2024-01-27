import React from "react";
import { BeatLoader } from "react-spinners";
import Cover from "./Cover";
import ProfielPictureInfos from "./ProfielPictureInfos";
import ProfileMenu from "./profileMenu";
import { useSelector } from "react-redux";
import { ProfileState } from "../../../reducers/profileReducer";
type Props = {
  ref: React.RefObject<HTMLDivElement>
  visitor: boolean
  profileState: ProfileState
  photos: any
  othername: string
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
  storyRef: React.RefObject<HTMLDivElement>
  openStory: boolean
  setOpenStory: (openStory: boolean) => void

}
const ProfileTop = ({
  storyRef,
  openStory,
  setOpenStory,
  ref, visitor, profileState, photos, setShowEdit, othername }: Props) => {
  const { darkTheme } = useSelector((state: any) => ({ ...state }));
  return (
    <div className="profile_top" ref={ref} style={{ marginTop: darkTheme ? "2px" : '' }} >
      <div className="profile_container">
        {
          profileState.loading ?
            <div className='profile_cover' style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
              <BeatLoader color="#1876f2" size={10} />
            </div>
            :
            < Cover
              cover={profileState.profile.cover!}
              visitor={visitor}
              photos={photos}
            />
        }

        <ProfielPictureInfos
          visitor={visitor}
          profile={profileState.profile}
          loading={profileState.loading}
          othername={othername}
          photos={photos}
          setShowEdit={setShowEdit}
          openStory={openStory}
          setOpenStory={setOpenStory}
          storyRef={storyRef}
        />


        <ProfileMenu
          nbreOfFriends={profileState.profile?.friends?.length}
          photos={photos}
          loading={profileState.loading}
        />

      </div>

    </div>
  )
};

export default ProfileTop