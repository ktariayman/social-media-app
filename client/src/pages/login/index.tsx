import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import './style.css';
import { InputLogin } from '../../components';
interface LoginFormValues {
  email: string;
  password: string;
}

const loginInfos: LoginFormValues = {
  email: '',
  password: ''
};
const onSubmit = (values: LoginFormValues) => {
  console.log(values);
  // call your loginSubmit function here
};

function Login() {
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const handleLoginChange = (e: any) => {
    const { name, ...value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  return (
    <div className='login'>
      <div className='login_wraper'>
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
                onSubmit={() => {}}
                // onSubmit={() => {
                //   loginSubmit();
                // }}
              >
                {(formik: any) => (
                  <Form>
                    <InputLogin
                      type='text'
                      name='text'
                      placeholder='Email address or phone number'
                      onChange={handleLoginChange}
                    />
                    <InputLogin
                      type='password'
                      name='password'
                      placeholder='Password'
                      onChange={handleLoginChange}
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

              {/* {error && <div className='error_text'>{error}</div>} */}
              {/* <div className='sign_splitter'></div>
          <button className='blue_btn open_signup' onClick={() => setVisible(true)}>
            Create Account
          </button> */}
            </div>
            {/* <Link to='/' className='sign_extra'>
          <b>Create a Page</b> for a celebrity, brand or business.
        </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
