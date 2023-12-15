import './style.css'
import { Header } from "../../components";
import FriendsLeft from "./FriendsLeft";
import FriendsRight from "./FriendsRight";
function Friends() {
 return (
  <>
   <Header page="friends" />
   <div className="friends">
    <FriendsLeft />
    <FriendsRight />
   </div>
  </>
 );
}

export default Friends;
