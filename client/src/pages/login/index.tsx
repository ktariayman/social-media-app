import React, { useState } from 'react';
import * as Yup from 'yup';
import './style.css';
import { LoginFormValues } from '../../interface/user';
import Footer from '../../components/login/Footer';
import LoginForm from '../../components/login/LoginForm';
import RegisterForm from '../../components/login/RegisterForm';

function Login() {
  const [visible, setVisible] = useState(false);

  return (
    <div className='login'>
      <div className='login_wraper'>
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}
        <Footer />
      </div>
    </div>
  );
}

export default Login;
