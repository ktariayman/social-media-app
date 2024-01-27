import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useClickOutside, useProfile } from '../../hooks';
import { Header, PostPopup } from '../../components';
import './style.css'
import Skeleton from 'react-loading-skeleton';
import ProfileTop from './ProfileTop';
import ProfileBottom from './ProfileBottom';
import { IUser } from '../../ts/interface/user';
import Notice from '../../components/notice/Notice';

function Profile() {
  const [visible, setVisible] = useState(false)
  const { username } = useParams()
  const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
  const userName = username === undefined ? user.username : username
  const [openStory, setOpenStory] = useState(false);
  const storyRef = useRef(null)
  useClickOutside(storyRef, () => {
    setOpenStory(false)
  });

  const {
    profileState,
    othername,
    profileTopRef,
    leftSide,
    setOthername,
    photos,
    visitor,
    dispatch
  } = useProfile({ usernameParams: username, userName })

  const [showEdit, setShowEdit] = useState(false);
  const [showPrev, setShowPrev] = useState(false);
  return (
    <div className='profile'>
      <Skeleton />
      {visible &&
        <PostPopup
          setVisible={setVisible}
          user={user}
          visible={visible}
          showPrev={showPrev}
          setShowPrev={setShowPrev}
          posts={profileState.profile.posts}
          dispatch={dispatch}
          profile={profileState.profile}
        />}
      <Header page="profile" />
      <ProfileTop
        photos={photos}
        othername={othername}
        profileState={profileState}
        ref={profileTopRef}
        setShowEdit={setShowEdit}
        visitor={visitor}
        openStory={openStory}
        setOpenStory={setOpenStory}
        storyRef={storyRef}
      />
      <Notice />
      <ProfileBottom
        profileState={profileState}
        ref={leftSide}
        setShowEdit={setShowEdit}
        visitor={visitor}
        photos={photos}
        showEdit={showEdit}
        setOthername={setOthername}
        setVisible={setVisible}
        userName={userName}

      />

      {openStory &&
        <div className='blur' >
          <div className='view_stories' ref={storyRef}>
            <div className='view_stories_header'>
              <i className='exit_icon' onClick={() => setOpenStory(false)}></i>
              <span>story</span>
              <div style={{ display: 'grid', gap: '10px' }}>
                {profileState.profile.lastStories &&
                  profileState.profile.lastStories.map((story: any) => (
                    <img src={story.image} style={{ height: '500px', objectFit: 'contain', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }} />

                  ))}
              </div>
            </div>
          </div>
        </div>
      }
    </div >);
}

export default Profile;
