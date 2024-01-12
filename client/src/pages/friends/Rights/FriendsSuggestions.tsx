import useNotFriends from "../../../hooks/useNotFriends";
import PplYouMayKnow from "../../profile/ProfileBottom/PeoplesYouMayKnow";

const FriendsSuggestions = () => {
  const { notFriends } = useNotFriends()
  if (notFriends.length === 0) return <div>no friends to suggest</div>
  return <PplYouMayKnow />
};

export default FriendsSuggestions;
