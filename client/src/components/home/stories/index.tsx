import { ArrowRight, Plus } from '../../../svg';
import './style.css';
import StoryItem from './StoryItem';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IStory, IUser } from '../../../ts/interface/user';
import { getStories } from '../../../functions/post/getStories';
import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
type Props = {
  setStoryVisible: (showPrev: boolean) => void;

}
function Stories({ setStoryVisible }: Props) {
  const navigate = useNavigate()
  const [stories, setStories] = useState<IStory[][]>([])
  const [loading, setLoading] = useState(false)
  const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));

  useEffect(() => {
    handleGetStories()
  }, [])
  // const handleGetStories = async () => {
  //   setLoading(true)

  //   const data = await getStories(user.token)
  //   setStories(data)
  //   setLoading(false)
  // }
  const handleGetStories = async () => {
    setLoading(true);
    const data: IStory[][] = await getStories(user.token);
    // make the user's story if exist , the first element on The data !!
    const userStoryIndex = data.findIndex(storyArr =>
      storyArr.some(story => story.username === user.username)
    );
    if (userStoryIndex !== -1 && data.length > 1) {
      const userStoryArray = data[userStoryIndex];
      data[userStoryIndex] = data[0];
      data[0] = userStoryArray;
    }
    setStories(data);
    setLoading(false);
  };
  const query1175px = useMediaQuery({
    query: '(max-width: 1175px)'
  });
  const query1040px = useMediaQuery({
    query: '(max-width: 1040px)'
  });
  const query960px = useMediaQuery({
    query: '(max-width: 960px)'
  });
  const query885px = useMediaQuery({
    query: '(max-width: 885px)'
  });
  const max = query885px ? 5 : query960px ? 4 : query1040px ? 5 : query1175px ? 4 : stories.length;
  return (
    <div className='stories'>
      <div className='create_story_card'
        onClick={() => {
          navigate('/stories/create');
        }}
      >
        <img src={user.picture} alt='' className='create_story_img' />
        <div className='plus_story'
        >
          <Plus color='#fff' />
        </div>
        <div className='story_create_text'>Create Story</div>
      </div>
      {loading ?
        <div className='home_middle' >
          <BeatLoader color="#1876f2" size={10} />

        </div>
        :
        <>
          {
            stories.slice(0, max).map((story: any, i: any) => (
              <StoryItem stories={story} key={i} />
            ))
          }</>
      }
      <div className='white_circle' >
        <ArrowRight color='#65676b' />
      </div>
    </div >
  );
}
export default Stories;
