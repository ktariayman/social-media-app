import SendVerification from "../home/sendVerification/sendVerification";
import Stories from "../home/stories";
import CreatePost from "../createPost";
type Props = {
  render: (post: any, i: number) => React.ReactNode;
  middle: React.RefObject<HTMLDivElement>;
  user: any;
  posts: any[];
  setVisible: (visible: boolean) => void;
  showPrev: boolean;
  setShowPrev: (showPrev: boolean) => void;
}
function ListPosts({ middle, user, posts, setVisible, showPrev, setShowPrev, render }: Props) {
  return (
    <div className='home_middle' ref={middle}>
      {user.verified === false && <SendVerification user={user} />}
      <Stories />
      <CreatePost user={user} setVisible={setVisible} showPrev={showPrev} setShowPrev={setShowPrev} />
      {posts.map(render)}
    </div>
  )
}

export default ListPosts;
