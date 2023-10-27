import '../style.css'
import { Header } from "../../../components";
import FriendsLeft from "../FriendsLeft";
import PplYouMayKnow from '../../profile/PeoplesYouMayKnow';

function Suggestions() {

 return (
  <>
   <Header page="friends" />
   <div className="friends">
    <FriendsLeft />
    <div className="suggestions_right">
     <PplYouMayKnow />

    </div>
   </div>
  </>
 );
}

export default Suggestions;
