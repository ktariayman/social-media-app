import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useProfile from '../../hooks/useProfile';
function Profile() {
  const { username } = useParams()

  const { user } = useSelector((user: any) => ({ ...user }));
  const userName = username === undefined ? user.username : username
  const { profileState } = useProfile({ usernameParams: username, userName })
  return <div>{userName}</div>;
}

export default Profile;
