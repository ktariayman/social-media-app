import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { InputLogin } from '../../components';
import { LoginFormValues } from '../../interface/user';
const loginInfos: LoginFormValues = {
  email: '',
  password: ''
};
function LoginForm({ setVisible }: any) {
  const [login, setLogin] = useState(loginInfos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { email, password } = login;
  const handleLoginChange = (e: any) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value.toString() });
  };
  const loginValidation = Yup.object({
    password: Yup.string().required('Password is required'),
    email: Yup.string().required('email is required').email()
  });
  return (
    <div className='login_wrap'>
      <div className='login_1'>
        <img src='../../icons/facebook.svg' alt='' />
        <span>Facebook helps you connect and share with the people in your life.</span>
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
            onSubmit={() => {}}
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
          <Link to='/reset' className='forgot_password'>
            Forgotten password?
          </Link>
          {/* <DotLoader color='#1876f2' loading={loading} size={30} /> */}

          {error && <div className='error_text'>{error}</div>}
          <div className='sign_splitter'></div>
          <button className='blue_btn open_signup' onClick={() => setVisible(true)}>
            Create Account
          </button>
        </div>
        <Link to='/' className='sign_extra'>
          <b>Create a Page</b> for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;