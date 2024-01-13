import { useState } from "react"
import { Dots } from "../../../svg";
import AddFriendSmallCard from "./AddFriendSmallCard";
import MenuFriends from "../../../components/ppltYouMayKnow/MenuFriends";
import useNotFriends from "../../../hooks/useNotFriends";

export default function PplYouMayKnow() {
  const { notFriends } = useNotFriends()
  const [isSuggesstion, setIsSuggestions] = useState(window.location.pathname === '/friends/suggestions')
  const [max, setMax] = useState(isSuggesstion ? 30 : 5)
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="pplumayknow">
      <div className="pplumayknow_header">
        People You May Know
        <div className="post_header_right ppl_circle hover1" onClick={() => { setShowMenu(!showMenu) }} style={{ position: 'relative' }}>
          {!isSuggesstion &&
            <>
              <Dots />
              {showMenu && <MenuFriends />}</>
          }
        </div>
      </div>
      <div className="pplumayknow_list">
        {notFriends !== (null || undefined) && notFriends && notFriends.length !== 0 && notFriends?.slice(0, max).map((item: any, i: any) => (
          <>
            <AddFriendSmallCard item={item} key={i} />
          </>
        ))}
      </div>
    </div>
  );
}
