import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import './style.css';
import { InputLogin } from '../../components';
import { LoginFormValues } from '../../interface/user';
import Footer from '../../components/login/Footer';

const loginInfos: LoginFormValues = {
  email: '',
  password: ''
};

function Login() {
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const handleLoginChange = (e: any) => {
    const { name, value } = e.target;
    console.log('login', [name], value);

    setLogin({ ...login, [name]: value.toString() });
  };
  const loginValidation = Yup.object({
    password: Yup.string().required('Password is required'),
    email: Yup.string().required('email is required').email()
  });
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
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Login;
