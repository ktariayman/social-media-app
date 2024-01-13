import { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header, SideBar, RightHome, Stories, CreatePost } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import './style.css';
import ActivateForm from './ActivateForm';
import { IUser } from '../../ts/interface/user';
import activateAccount from '../../functions/user/activateAccount';
function Activate({ setVisible, visible }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const middle = useRef(null);
  const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [storyVisible, setStoryVisible] = useState(false);
  const { token } = useParams();
  useEffect(() => {
    activateAccountHandler();
  }, []);

  const activateAccountHandler = async () => {
    try {
      setLoading(true);
      const data = await activateAccount(user.token)
      setSuccess(data.message);
      Cookies.set('user', JSON.stringify({ ...user, verified: true }));
      dispatch({
        type: 'VERIFY',
        payload: true
      });
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error: any) {
      setError(error.response.data.message);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };
  return (
    <div className='home'>
      {success && (
        <ActivateForm
          type='success'
          header='Account verification succeded.'
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type='error'
          header='Account verification failed.'
          text={error}
          loading={loading}
        />
      )}
      <Header page='home' />
      <SideBar user={user} />
      <RightHome user={user} />
      <div className='home_middle' ref={middle}>
        <Stories setStoryVisible={setStoryVisible} />
        <CreatePost user={user} setVisible={setVisible} loading={loading} />
      </div>
    </div>
  );
}

export default Activate;
