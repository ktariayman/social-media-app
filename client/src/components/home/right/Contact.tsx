import { useNavigate } from "react-router-dom";

function Contact({ user }: any) {
  console.log('user from contact', user);

  const navigate = useNavigate();
  return (
    <div className='contact hover3' onClick={() => { (navigate(`/profile/${user.username}`)) }}>
      <div className='contact_img'>
        <img src={user.picture} alt='' />
      </div>
      <span>
        {user.first_name} {user.last_name}
      </span>
    </div>
  );
}
export default Contact;
