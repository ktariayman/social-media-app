import SendVerification from "../home/sendVerification/sendVerification";
import Stories from "../home/stories";
import CreatePost from "../createPost";
import { BeatLoader } from "react-spinners";
import { IUser } from "../../ts/interface/user";
import Notice from "../notice/Notice";
type Props = {
  render: (post: any, i: number) => React.ReactNode;
  middle: React.RefObject<HTMLDivElement>;
  user: IUser;
  posts: any[];
  setVisible: (visible: boolean) => void;
  showPrev: boolean;
  setShowPrev: (showPrev: boolean) => void;
  setStoryVisible: (showPrev: boolean) => void;
  loading: boolean
}
function ListPosts({ loading, middle, user, posts, setVisible, showPrev, setShowPrev, render, setStoryVisible }: Props) {
  return (
    <div className='home_middle' ref={middle}>
      <Notice />
      {user.verified === false && <SendVerification user={user} />}
      <Stories setStoryVisible={setStoryVisible} />
      <CreatePost user={user} setVisible={setVisible} showPrev={showPrev} setShowPrev={setShowPrev} loading={loading} />

      {loading ?
        <div className='home_middle' >
          <BeatLoader color="#1876f2" size={10} />

        </div>
        :
        <>
          {
            posts.map(render)
          }
        </>

      }
    </div>
  )
}

export default ListPosts;
