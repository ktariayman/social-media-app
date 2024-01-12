import { useState, useRef } from 'react';
import {
  Header,
  RightHome,
  SideBar,
  Post
} from '../../components';
import { useSelector } from 'react-redux';
import './style.css';
import ListPosts from '../../components/ListPosts/ListPosts';
import { IUser } from '../../ts/interface/user';
import { usePosts } from '../../hooks';
import { getAllPostsService } from '../../functions';

function Home({ setVisible, visible, showPrev, setShowPrev }: any) {
  const middle = useRef<HTMLDivElement>(null);
  const { postState } = usePosts({
    setVisible,
    getData: getAllPostsService,
    visible
  })
  const [storyVisible, setStoryVisible] = useState(false);

  const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
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
