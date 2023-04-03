import { useState } from 'react';
import './style.css';
import { Footer, LoginForm, RegisterForm } from '../../components';

function Login() {
  const [visible, setVisible] = useState(false);
  return (
    <div className='login'>
      <div className='login_wrapper'>
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}
        <Footer />
      </div>
    </div>
  );
}

export default Login;
