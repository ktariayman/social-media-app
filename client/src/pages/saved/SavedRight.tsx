import { BeatLoader } from "react-spinners";
import { Post } from "../../components";
import Notice from "../../components/notice/Notice";

function SavedRight({ data, token }: any) {
  return (
    <div className="saved_right">
      <Notice />
      <h2>all saved Posts : {data?.length}   </h2>
      {data === undefined ?
        <div>
          <BeatLoader color="#1876f2" size={10} />
        </div>
        :
        <>
          {
            data && data.map((p: any, i: number) => {
              return <Post key={i} post={p.post} user={p.post.user} token={token} />
            })
          }
        </>
      }
    </div>
  )
}

export default SavedRight;
