import { useEffect, useState } from "react";
import { IStory } from "../../../ts/interface/user";
type Props = {
  stories: IStory[]
}
function StoryItem({ stories }: Props) {
  const [lastStory, setLastStory] = useState<IStory>()
  const getLastStoryImage = (): IStory => {
    return stories[0];
  };

  useEffect(() => {
    setLastStory(getLastStoryImage())
  }, [])

  return (
    lastStory ? (
      <div className='story'>
        {lastStory.image !== '' && <img src={lastStory.image} alt='' className='story_img' />}
        <b
          style={{
            position: 'absolute',
            color: "#b30d0dba",
            top: 10,
            right: 0,
            zIndex: 99,
            fontSize: "12px"
          }}
        >{lastStory.createdAt}</b>
        <div className='story_profile_pic'>
          <img src={lastStory.profile_picture} alt='' />
        </div>
        <div className='story_profile_name'>{lastStory.profile_name}</div>
      </div>
    ) :
      (
        <div>eeeeeeeeeeeeeeeeeee</div>
      )
  );
}
export default StoryItem