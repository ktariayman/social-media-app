import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import SearchAccount from '../../components/reset/searchAccount';
import ChangePassword from '../../components/reset/changePassword';
import CodeVerification from '../../components/reset/codeVerification';
import SendEmail from '../../components/reset/sendEmail';

function ResetPassword() {
  const { user } = useSelector((state: any) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(0);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [conf_password, setConf_password] = useState('');
  const [error, setError] = useState('');
  const [userInfos, setUserInfos] = useState('');
  const logout = () => {
    Cookies.set('user', '');
    dispatch({
      type: 'LOGOUT'
    });
    navigate('/login');
  };
  return (
    <div className='reset'>
      <div className='reset_header'>
        <img src='../../../icons/facebook.svg' alt='' />
        {user ? (
          <div className='right_reset'>
            <Link to='/profile'>
              <img src={user.picture} alt='' />
            </Link>
            <button
              className='blue_btn'
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to='/login' className='right_reset'>
            <button className='blue_btn'>Login</button>
          </Link>
        )}
      </div>
      <div className='reset_wrap'>
        {visible === 0 && (
          <SearchAccount
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
          />
        )}
        {visible === 1 && userInfos && (
          <SendEmail
            email={email}
            userInfos={userInfos}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
          />
        )}
        {visible === 2 && (
          <CodeVerification
            user={user}
            code={code}
            setCode={setCode}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
            userInfos={userInfos}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            password={password}
            conf_password={conf_password}
            setConf_password={setConf_password}
            setPassword={setPassword}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
            userInfos={userInfos}
          />
        )}
      </div>
    </div>
  );
}

export default ResetPassword;