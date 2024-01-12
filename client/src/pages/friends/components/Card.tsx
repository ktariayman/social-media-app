import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { acceptRequest, cancelRequest, deleteRequest, unfollow, unfriend } from '../../../functions/profile/invitationSystem'
import { IUser } from "../../../ts/interface/user";


export default function Card({ userr, type, getData }: any) {
 const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
 const RequestHandler = async (cb: any) => {
  const res = await cb(userr._id, user.token);
  if (res == "ok") {
   getData();
  }
 };


 return (
  <div className="req_card">
   <Link to={`/profile/${userr.username}`}>
    <img src={userr.picture} alt="" />
   </Link>
   <div className="req_name">
    {userr.first_name} {userr.last_name}
   </div>
   {type === "sent" ? (
    <>
     <button
      className="blue_btn"
      onClick={() => RequestHandler(cancelRequest)}
     >
      Cancel Request
     </button>
     <button
      className="blue_btn"
      onClick={() => RequestHandler(unfollow)}
     >
      Unfollow
     </button>
    </>
   ) : type === "request" ? (
    <>
     <button
      className="blue_btn"
      onClick={() => RequestHandler(acceptRequest)}
     >
      Confirm
     </button>
     <button
      className="gray_btn"
      onClick={() => RequestHandler(deleteRequest)}
     >
      Delete
     </button>
    </>
   ) : type === "friends" ? (
    <div className="req_friends">
     <button
      className="blue_btn"
      onClick={() => RequestHandler(unfriend)}
     >
      Unfriend
     </button>
    </div>
   ) : (
    ""
   )}
  </div>
 );
}
