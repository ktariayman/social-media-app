import { useParams } from "react-router-dom";
import FriendsRequests from "./Rights/FriendsRequests";
import FriendsSent from "./Rights/FriendsSent";
import AllFriends from "./Rights/AllFriends";
import FriendsSuggestions from "./Rights/FriendsSuggestions";
import FriendsBirthdays from "./Rights/FriendsBirthdays";
import Notice from "../../components/notice/Notice";

type Type = 'suggestions' | 'birthdays' | "requests" | 'sent' | 'all'
const MapFriendsRights = {
  requests: <FriendsRequests />,
  sent: <FriendsSent />,
  all: <AllFriends />,
  suggestions: <FriendsSuggestions />,
  birthdays: <FriendsBirthdays />,
}
function FriendsRight({ data, getData }: any) {
  const type: Type | undefined = useParams().type as Type;
  return (
    <div className={"friends_right"}>
      <Notice />
      {children(type)}
    </div>
  );
}

export default FriendsRight;

const children = (type: Type): JSX.Element => { return MapFriendsRights[type] }