import { useNavigate } from "react-router-dom";
import { Friend } from "../../../ts/types";

function Contact({ friend }: { friend: Friend }) {

  const navigate = useNavigate();
  return (
    <div className='contact hover3' onClick={() => { (navigate(`/profile/${friend.username}`)) }}>
      <div className='contact_img'>
        <img src={friend.picture} alt='' />
      </div>
      <span>
        {friend.first_name} {friend.last_name}
      </span>
    </div>
  );
}
export default Contact;
