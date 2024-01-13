import { useNavigate } from "react-router-dom";
import { IUser } from "../../../ts/interface/user";
import { useState } from 'react'
import { useSelector } from "react-redux";
import { addFriend, cancelRequest } from "../../../functions/profile/invitationSystem";

export default function AddFriendSmallCard(item: any) {
  const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
  const [text, setText] = useState(item.item.requests.includes(user.id) ? "Cancel request" : "Add Friend")
  const handleAddFriend = async () => {
    await addFriend(item.item._id as string, user.token as string);
    setText('Cancel request')
  }
  const handleCancelRequest = async () => {
    await cancelRequest(item.item._id, user.token);
    setText('Add Friend')
  }
  const navigate = useNavigate()
  const [profileName, setProfileName] = useState(`${item.item.first_name} ${item.item.last_name}`)
  return (
    <div className="addfriendCard" >
      <div className="addfriend_imgsmall">
        <img src={item.item.picture} alt="" onClick={() => { navigate(`/profile/${item.item.username}`) }} />
        <div className="addfriend_infos">
          <div className="addfriend_name">
            {profileName.length > 11
              ? `${profileName.substring(0, 11)}...`
              : profileName}
          </div>
          <button className="blue_btn" style={{ height: '40px' }} onClick={text === "Add Friend" ? handleAddFriend : handleCancelRequest}         >
            <img
              src={text === "Add Friend" ? "../../../icons/addFriend.png" : "../../../icons/cancelRequest.png"}
              alt=""
              style={{ width: "20px", height: "20px" }}
              className="invert"
            />
            <span >
              {text}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
