import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Moment from "react-moment";
import { Dots, Public } from "../../svg";
import ReactsPopup from "./ReactsPopup";
import { useEffect, useRef, useState } from "react";
import CreateComment from "./createComment";
import PostMenu from "./postMenu";
import { getReacts, reactPost } from "../../functions";
import Comment from "./Comment";
function Post({ post, user, profile, visitor, token }: any) {
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reacts, setReacts] = useState<any>([]);
  const [check, setCheck] = useState(undefined);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(1);
  const [checkSaved, setCheckSaved] = useState();
  const [comments, setComments] = useState<any>([]);
  const postRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    getPostReacts();
  }, [post]);
  useEffect(() => {
    setComments(post?.comments);
  }, [post]);

  const getPostReacts = async () => {
    const res = await getReacts(post._id, token);
    setReacts(res.reacts);
    setCheck(res.check);
    setTotal(res.total);
    setCheckSaved(res.checkSaved);
  };

  const reactHandler = async (type: any) => {
    reactPost(post._id, type, token);
    if (check === type) {
      setCheck(undefined);
      let index = reacts.findIndex((x: any) => x.react === check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotal((prev) => --prev);
      }
    } else {
      setCheck(type);
      let index = reacts.findIndex((x: any) => x.react === type);
      let index1 = reacts.findIndex((x: any) => x.react === check);

      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = ++reacts[index].count)]);
        setTotal((prev) => ++prev);
      }
      if (index1 !== -1) {
        setReacts([...reacts, (reacts[index1].count = --reacts[index1].count)]);
        setTotal((prev) => --prev);
      }
    }
  };
  const showMoreComments = () => {
    setCount((prev) => prev + 3);
  };
  const handleClassNameGrid = (post: any) => {
    if (post.images.length === 1) return "grid_1"
    if (post.images.length === 2) return "grid_2"
    if (post.images.length === 3) return "grid_3"
    if (post.images.length === 4) return "grid_4"
    if (post.images.length >= 5) return "grid_5"
    return ""
  }

  return (
    <div
      className="post"
      style={{ width: `${profile && "100%"}` }}
      ref={postRef}
    >
      <div className="post_header">
        <div
          onClick={() => { navigate(`/profile/${post.user.username}`) }}
          className="post_header_left"
        >
          <img src={post.user.picture} alt="" />
          <div className="header_col">
            <div className="post_profile_name">
              {!visitor ? (
                `
                ${post.user.first_name + post.user.last_name}
              `
              ) : (
                <span>You</span>
              )}

              <div className="updated_p">
                {post.type === "profilePicture" &&
                  `updated ${post.user.gender === "male" ? "his" : "her"
                  } profile picture`}
                {post.type === "coverPicture" &&
                  `updated ${post.user.gender === "male" ? "his" : "her"
                  } cover picture`}
              </div>
            </div>
            <div className="post_profile_privacy_date">
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              . <Public color="#828387" />
            </div>
          </div>
        </div>
        <div
          className="post_header_right hover1"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <Dots color="#828387" />
        </div>
      </div>
      {post.background ? (
        <div
          className="post_bg"
          style={{ backgroundImage: `url(${post.background})` }}
        >
          <div className="post_bg_text">{post.text}</div>
        </div>
      ) : post.type === null ? (
        <>
          <div className="post_text">{post.text}</div>
          {post.images && post.images.length !== 0 && (
            <div
              className={
                handleClassNameGrid(post)
              }
            >
              {post.images.slice(0, 5).map((image: { url: string }, i: number) => (
                <img src={image.url} key={i} alt="" className={`img-${i}`} />
              ))}
              {post.images.length > 5 && (
                <div className="more-pics-shadow">
                  +{post.images.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      ) : post.type === "profilePicture" ? (
        <div className="post_profile_wrap">
          <div className="post_updated_bg">
            <img src={post.user.cover} alt="" />
          </div>
          <img
            src={post.images[0]?.url}
            alt=""
            className="post_updated_picture"
          />
        </div>
      ) : (
        <div className="post_cover_wrap">
          <img src={post.images[0]?.url} alt="" />
        </div>
      )}

      <div className="post_infos">
        <div className="reacts_count">
          <div className="reacts_count_imgs">
            {reacts &&
              reacts
                .sort((a: any, b: any) => {
                  return b.count - a.count;
                })
                .slice(0, 3)
                .map(
                  (react: any, i: any) =>
                    react.count > 0 && (
                      <img
                        src={`../../../reacts/${react.react}.svg`}
                        alt=""
                        key={i}
                      />
                    )
                )}
          </div>
          <div className="reacts_count_num">{total > 0 && total}</div>
        </div>
        <div className="to_right">
          <div className="comments_count">{comments.length} comments</div>
          <div className="share_count">0 share</div>
        </div>
      </div>
      <div className="post_actions">
        <ReactsPopup
          visible={visible}
          setVisible={setVisible}
          reactHandler={reactHandler}
        />
        <div
          className="post_action hover1"
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
          onClick={() => reactHandler(check ? check : "like")}
        >
          {check ? (
            <img
              src={`../../../reacts/${check}.svg`}
              alt=""
              className="small_react"
              style={{ width: "18px" }}
            />
          ) : (
            <i className="like_icon"></i>
          )}
          <span
            style={{
              color: `
        
        ${check === "like"
                  ? "#4267b2"
                  : check === "love"
                    ? "#f63459"
                    : check === "haha"
                      ? "#f7b125"
                      : check === "sad"
                        ? "#f7b125"
                        : check === "wow"
                          ? "#f7b125"
                          : check === "angry"
                            ? "#e4605a"
                            : ""
                }
        `,
            }}
          >
            {check ? check : "Like"}
          </span>
        </div>
        <div className="post_action hover1">
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        <div className="post_action hover1">
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
      </div>
      <div className="comments_wrap">
        <div className="comments_order"></div>
        <CreateComment
          user={user}
          postId={post._id}
          setComments={setComments}
          setCount={setCount}
        />
        {comments &&
          comments
            .sort((a: any, b: any) => {
              return +new Date(b.commentAt) - +new Date(a.commentAt);
            })
            .slice(0, count)
            .map((comment: any, i: any) => <Comment comment={comment} key={i} />)}
        {count < comments.length && (
          <div className="view_comments" onClick={showMoreComments}>
            View more comments
          </div>
        )}
      </div>
      {showMenu && (
        <PostMenu
          userId={user.id}
          postUserId={post.user._id}
          imagesLength={post?.images?.length}
          setShowMenu={setShowMenu}
          postId={post._id}
          token={token}
          checkSaved={checkSaved}
          setCheckSaved={setCheckSaved}
          images={post.images}
          postRef={postRef}
          isArchived={post.isArchived}
        />
      )}
    </div>
  )
}

export default Post;
