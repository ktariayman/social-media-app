import { useNavigate } from "react-router-dom";
import MenuItem from "../post/MenuItem";
import './style.css'
export default function MenuFriends({
}: any) {
 const navigate = useNavigate()
 const goToFriendsPage = () => {
  navigate('/friends/suggestions')
 }
 return (
  <ul className="friend_menu" onClick={goToFriendsPage}>
   <MenuItem title="See All" />
  </ul>
 );
}
