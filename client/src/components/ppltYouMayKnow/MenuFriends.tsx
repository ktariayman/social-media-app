import { useNavigate } from "react-router-dom";
import MenuItem from "../post/MenuItem";
import './style.css'
export default function MenuFriends() {
 const navigate = useNavigate()

 return (
  <ul className="friend_menu" onClick={() => {
   navigate('/friends/suggestions')
  }}>
   <MenuItem title="See All" />
  </ul>
 );
}
