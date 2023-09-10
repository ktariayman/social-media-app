import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { InputLogin } from '../../components';
import { loginValidation, loginFormData } from '../../helper';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import DotLoader from 'react-spinners/DotLoader';
type Props = {
  setVisible: (b: boolean) => void
  setVisiblePage: (b: boolean) => void
}
function LoginForm({ setVisible, setVisiblePage }: Props) {
  const [login, setLogin] = useState(loginFormData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const { email, password } = login;
  const handleLoginChange = (e: any) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value.toString() });
  };
  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        email,
        password
      });
      dispatch({ type: 'LOGIN', payload: data });
      Cookies.set('user', JSON.stringify(data));
      navigate('/');
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className='login_wrap'>
      <div className='login_1'>
        <img src='../../icons/facebook.svg' alt='' />
        <p style={{ fontWeight: "400", fontSize: "30px" }}>Recent Logins</p>
        <p>Click your picture or Add Account.</p>
      </div>
      <div className='login_2'>
        <div className='login_2_wrap'>
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik: any) => (
              <Form>
                <InputLogin
                  type='text'
                  name='email'
                  placeholder='Email address or phone number'
                  onInput={handleLoginChange}
                />
                <InputLogin
                  type='password'
                  name='password'
                  placeholder='Password'
                  onInput={handleLoginChange}
                  bottom
                />
                <button type='submit' className='blue_btn'>
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to='/resetPassword' className='forgot_password'>
            Forgotten password?
          </Link>
          <DotLoader color='#1876f2' loading={loading} size={30} />

          {error && <div className='error_text'>{error}</div>}
          <div className='sign_splitter'></div>
          <button className='blue_btn open_signup' onClick={() => setVisible(true)}>
            Create Account
          </button>
        </div>
        <b onClick={() => { setVisiblePage(true) }} style={{ cursor: 'pointer' }}>Create a Page</b> for a celebrity, brand or business.
      </div>
    </div>
  );
}

export default LoginForm;
