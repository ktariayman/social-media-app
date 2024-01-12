import { Feeling, LiveVideo, Photo } from '../../svg';
import './style.css';
import { CreatePostIcon } from './createPostIcon';
import { MoonLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../ts/interface/user';

type Props = {
  user: IUser
  setVisible: (visible: boolean) => void;
  showPrev?: boolean;
  setShowPrev?: (showPrev: boolean) => void;
  profile?: boolean
  loading: boolean
}
function CreatePost({ user, setVisible, profile, setShowPrev, loading }: Props) {
  const navigate = useNavigate()
  return (
    <div className='createPost'>
      <div className='createPost_header'>

        {
          loading ? (
            <MoonLoader color="#1876f2" size={10} />
          ) : (
            <img src={user?.picture} alt='' onClick={() => { navigate(`/profile/${user.username}`) }} />

          )
        }
        <div
          className='open_post hover2'
          onClick={() => {
            setVisible(true);
          }}
        >
          What's on your mind, {user?.first_name}
        </div>
      </div>
      <div className='create_splitter'></div>
      <div className='createPost_body'>
        <CreatePostIcon>
          <LiveVideo color='#f3425f' />
          Live Video
        </CreatePostIcon>
        <CreatePostIcon onClick={() => {
          setVisible && setVisible(true);
          setShowPrev && setShowPrev(true)
        }}>
          <Photo color='#4bbf67' />

          Photo/Video
        </CreatePostIcon>

        {profile ? (
          <CreatePostIcon>
            <i className='lifeEvent_icon'></i>
            Life Event
          </CreatePostIcon>
        ) : (
          <CreatePostIcon>
            <Feeling color='#f7b928' />
            Feeling/Activity

          </CreatePostIcon>

        )}
      </div>
    </div>
  );
}
export default CreatePost;
