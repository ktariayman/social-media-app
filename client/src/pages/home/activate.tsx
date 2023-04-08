import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header';
import SideBar from '../../components/home/sidebar';
import { useSelector, useDispatch } from 'react-redux';
import RightHome from '../../components/home/right';
import Stories from '../../components/home/stories';
import CreatePost from '../../components/createPost';
import axios from 'axios';
import Cookies from 'js-cookie';

import './style.css';
import ActivateForm from './ActivateForm';
function Activate({ setVisible, visible }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const middle = useRef(null);
  const { user } = useSelector((state: any) => ({ ...state }));
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { token } = useParams();
  useEffect(() => {
    activateAccount();
  }, []);

  const activateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
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
        <Stories />
        <CreatePost user={user} setVisible={setVisible} />
      </div>
    </div>
  );
}

export default Activate;
