import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { SendEmail, CodeVerification, ChangePassword, SearchAccount } from '../../components';
import { useLogout } from '../../hooks';
import { ResetPassConfigurationContextProvider, useResetPassConfigurationContext } from '../../contexts/ResetPasswordContext';
import { IUser } from '../../ts/interface/user';
import Notice from '../../components/notice/Notice';

function ResetPassword() {
  return (
    <ResetPassConfigurationContextProvider>
      <ResetPasswordContent />
    </ResetPassConfigurationContextProvider>

  )
}

function ResetPasswordContent() {
  const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
  const navigate = useNavigate();
  const { visible, userInfos, setVisible, visiblePages } = useResetPassConfigurationContext()
  const logout = useLogout()
  useEffect(() => {
    if (user) setVisible(visiblePages.changePass);
  }, []);


  return (

    <div className='reset'>
      <Notice />
      <div className='reset_header'>
        <img src='../../../icons/devBook.png' height={40} width={40} alt='' onClick={() => { navigate('/') }} />
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
      <div className='reset_wrap' >
        {visible === 0 && !user && (<SearchAccount />)}
        {visible === 1 && userInfos && !user && (<SendEmail />)}
        {visible === 2 && !user && (<CodeVerification />)}
        {visible === 3 && (<ChangePassword user={user} />)}
      </div>
    </div>
  );
}

export default ResetPassword;
