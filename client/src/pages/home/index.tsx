import React, { useState, useReducer, useRef } from 'react';
import {
  Header,
  RightHome,
  Stories,
  CreatePost,
  SendVerification,
  SideBar,
  Post
} from '../../components';
import { useSelector } from 'react-redux';
import './style.css';
import { getAllPostsService } from '../../functions';
import postReducer from '../../reducers/postReducer';
import { usePosts } from '../../hooks';
import ListPosts from '../../components/ListPosts/ListPosts';
import { PostActionType } from '../../ts/enums';
import { BeatLoader, HashLoader } from 'react-spinners';

function Home({ setVisible, visible, showPrev, setShowPrev, postState }: any) {
  const middle = useRef<HTMLDivElement>(null);

  const [storyVisible, setStoryVisible] = useState(false);

  const { user } = useSelector((state: any) => ({ ...state }));
  return (
    <div className='home'>
      <Header page='home' />
      <div className='home_2'>

        <SideBar user={user} />

        <ListPosts
          render={(post: any, i: number) => {
            return <Post key={i} post={post} user={user} token={user.token} />
          }}
          setStoryVisible={setStoryVisible}
          middle={middle}
          user={user}
          posts={postState?.posts}
          setVisible={setVisible}
          showPrev={showPrev}
          setShowPrev={setShowPrev}
          loading={postState?.loading}
        />
        <RightHome user={user} />
      </div>

    </div>
  );
}

export default Home;
