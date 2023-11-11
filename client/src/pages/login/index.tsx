import { useState } from 'react';
import './style.css';
import { Footer, LoginForm, RegisterForm } from '../../components';
import CreatePage from '../../components/createPage/createPage';

function Login() {
  const [visible, setVisible] = useState<boolean>(false);
  const [visiblePage, setVisiblePage] = useState<boolean>(false);

  return (
    <div className='login'>
      <div className='login_wrapper'>
        <LoginForm setVisible={setVisible} setVisiblePage={setVisiblePage} />
        {visible && <RegisterForm setVisible={setVisible} />}
        {visiblePage && <CreatePage setVisiblePage={setVisiblePage} />}
      </div>
      <Footer />

    </div>
  );
}

export default Login;
