import SendVerification from "../home/sendVerification/sendVerification";
import Stories from "../home/stories";
import CreatePost from "../createPost";

function ListPosts({middle, user, posts,setVisible,showPrev, setShowPrev,render}:any) {
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
