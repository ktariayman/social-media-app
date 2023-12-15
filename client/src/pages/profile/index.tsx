import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import useProfile from '../../hooks/useProfile';
import { CreatePost, Header, Post, PostPopup } from '../../components';
import Cover from './Cover';
import ProfielPictureInfos from './ProfielPictureInfos';
import './style.css'
import ProfileMenu from './profileMenu';
import PplYouMayKnow from './PeoplesYouMayKnow';
import { BeatLoader, HashLoader } from 'react-spinners';
import GridPosts from './gridPosts';
import { useMediaQuery } from 'react-responsive';
import Photos from './Photos';
import Friends from './Friends';
import Footer from './Footer';
import ProfileDetails from '../../components/profileDetails/profilteDetails';
import Skeleton from 'react-loading-skeleton';
import { loadavg } from 'os';

function Profile() {
  const [visible, setVisible] = useState(false)
  const { username } = useParams()
  const { user } = useSelector((user: any) => ({ ...user }));
  const userName = username === undefined ? user.username : username
  const {
    profileState,
    othername,
    profileTop,
    leftSide,
    setOthername,
    photos,
    visitor,
    dispatch
  } = useProfile({ usernameParams: username, userName })
  const [showEdit, setShowEdit] = useState(false);
  const [showPrev, setShowPrev] = useState(false);
  const { darkTheme } = useSelector((state: any) => ({ ...state }));
  const navigate = useNavigate()
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
      <div className="profile_top" ref={profileTop} style={{ marginTop: darkTheme ? "2px" : '' }} >
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
          />


          <ProfileMenu
            nbreOfFriends={profileState.profile?.friends?.length}
            photos={photos}
            loading={profileState.loading}
          />

        </div>

      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            {!visitor &&
              <PplYouMayKnow />
            }
            <div
              className="profile_grid"
            >
              <div className="profile_left" ref={leftSide}>
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
                      token={user.token}
                      photos={photos}
                    />
                    <Friends friends={profileState.profile.friends} />
                  </>
                )}
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </div >);
}

export default Profile;
