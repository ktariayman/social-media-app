import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { InputLogin } from '../../components';
import * as Yup from 'yup';
import axios from 'axios';
import { validatePassword } from '../../helper';
type Props = {
  password: string
  conf_password: string
  setPassword: (e: string) => void;
  setConf_password: (e: string) => void;
  error: string
  setError: (s: string) => void
  setLoading: (b: boolean) => void
  setVisible: (n: number) => void
  userInfos: any
  user: any
  loading: boolean
}
export default function ChangePassword({
  password,
  setPassword,
  conf_password,
  setConf_password,
  error,
  loading,
  setLoading,
  userInfos,
  setError,
  user
}: Props) {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfos) setEmail(userInfos.email);
    if (user) setEmail(user.email);
  }, []);
  console.log('email', email);

  const changePassword = async () => {
    try {
      setLoading(true);

      if (user) {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/changePassword`,
          {
            email,
            oldPassword,
            newPassword: password
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        );
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/resetPassword`, {
          email,
          password
        });
      }
      setError('');
      navigate('/');
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  if (!user)
    return (
      <div className='reset_form' style={{ height: '310px' }}>
        <div className='reset_form_header'>Change Password</div>
        <div className='reset_form_text'>Pick a strong password</div>
        <Formik
          enableReinitialize
          initialValues={{
            password,
            conf_password
          }}
          validationSchema={validatePassword}
          onSubmit={() => {
            changePassword();
          }}
        >
          {(formik) => (
            <Form>
              <InputLogin
                type='password'
                name='password'
                onChange={(e: any) => setPassword(e.target.value)}
                placeholder='New password'
              />
              <InputLogin
                type='password'
                name='conf_password'
                onChange={(e: any) => setConf_password(e.target.value)}
                placeholder='Confirm new password'
                bottom
              />
              {error && <div className='error_text'>{error}</div>}
              <div className='reset_form_btns'>
                <Link to='/login' className='gray_btn'>
                  Cancel
                </Link>
                <button type='submit' className='blue_btn'>
                  Continue
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  return (
    <div className='reset_form' style={{ height: '310px' }}>
      <div className='reset_form_header'>Change Password</div>
      <div className='reset_form_text'>Pick a strong password</div>
      <Formik
        enableReinitialize
        initialValues={{ oldPassword, password, conf_password }}
        validationSchema={validatePassword}
        onSubmit={changePassword}
      >
        {(formik) => (
          <Form>
            <InputLogin
              type='password'
              name='oldpassword'
              onChange={(e: any) => setOldPassword(e.target.value)}
              placeholder='Old password'
            />
            <InputLogin
              type='password'
              name='password'
              onChange={(e: any) => setPassword(e.target.value)}
              placeholder='New password'
            />
            <InputLogin
              type='password'
              name='conf_password'
              onChange={(e: any) => setConf_password(e.target.value)}
              placeholder='Confirm new password'
              bottom
            />
            {error && <div className='error_text'>{error}</div>}
            <div className='reset_form_btns'>
              <Link to='/login' className='gray_btn'>
                Cancel
              </Link>
              <button type='submit' className='blue_btn'>
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
