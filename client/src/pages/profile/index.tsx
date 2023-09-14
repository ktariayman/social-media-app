import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import useProfile from '../../hooks/useProfile';
import { CreatePost, Header, Post, PostPopup } from '../../components';
import Cover from './Cover';
import ProfielPictureInfos from './ProfielPictureInfos';
import './style.css'
import ProfileMenu from './profileMenu';
import PplYouMayKnow from './PeoplesYouMayKnow';
import { HashLoader } from 'react-spinners';
import GridPosts from './gridPosts';
import { useMediaQuery } from 'react-responsive';
import Photos from './Photos';
import Friends from './Friends';
import Footer from './Footer';
import ProfileDetails from '../../components/profileDetails/profilteDetails';

function Profile({ visible, setVisible }: any) {
  const { username } = useParams()
  const { user } = useSelector((user: any) => ({ ...user }));
  const userName = username === undefined ? user.username : username
  const { profileState, othername, profileTop,
    leftSide,
    height,
    setHeight,
    leftHeight,
    setLeftHeight,
    scrollHeight,
    setScrollHeight,
    check,
    getScroll,
    setOthername,
    setShowCoverMenu,
    photos,
    setPhotos,
    showCoverMenu,
    dispatch,
    visitor
  } = useProfile({ usernameParams: username, userName })
  const { profile, loading, error } = profileState

  return (
    <div className='profile'>

      <Header page="profile" />
      <div className="profile_top" ref={profileTop}>
        <div className="profile_container">
          <Cover
            cover={profile.cover!}
            visitor={visitor}
          />
          <ProfielPictureInfos
            visitor={visitor}
            profile={profile}
            loading={loading}
            othername={othername}
            photos={photos}
          />
          <ProfileMenu />

        </div>

      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PplYouMayKnow />
            <div
              className={`profile_grid ${check && scrollHeight >= height && leftHeight > 1000
                ? "scrollFixed showLess"
                : check &&
                scrollHeight >= height &&
                leftHeight! < 1000 &&
                "scrollFixed showMore"
                }`}
            >
              <div className="profile_left" ref={leftSide}>
                {loading ? (
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
                    <div className="profile_card">
                      <div className="profile_card_header">
                        Friends
                        <div className="profile_header_link">
                          See all friends
                        </div>
                      </div>
                      <div className="sekelton_loader">
                        <HashLoader color="#1876f2" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <ProfileDetails
                      oldDetails={profile.details}
                      visitor={visitor}
                      setOthername={setOthername}
                    />
                    <Photos
                      username={userName}
                      token={user.token}
                      photos={photos}
                    />
                    <Friends friends={profile.friends} />
                  </>
                )}
                <Footer />
              </div>
              <div className="profile_right">
                {!visitor && (
                  <CreatePost user={user} profile setVisible={setVisible} />
                )}
                <GridPosts />
                {loading ? (
                  <div className="sekelton_loader">
                    <HashLoader color="#1876f2" />
                  </div>
                ) : (
                  <div className="posts">
                    {profile.posts && profile.posts.length ? (
                      profile.posts.map((post: any) => (
                        <Post post={post} user={user} key={post._id} profile />
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
