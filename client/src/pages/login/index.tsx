import './style.css';
import { LoginForm, RegisterForm } from '../../components';
import { AuthConfigurationContextProvider, useAuthConfigurationContext } from '../../contexts/AuthentificationContext';
import CreatePage from '../../components/createPage/createPage';
import Notice from '../../components/notice/Notice';
function Login() {
  return (
    <AuthConfigurationContextProvider>
      <LoginContent />
    </AuthConfigurationContextProvider>
  );
}
function LoginContent() {
  const { visible, visiblePage } = useAuthConfigurationContext();

  return (
    <div className='login'>
      <Notice />
      <div className='login_wrapper'>
        <LoginForm />
        {visible && <RegisterForm />}
        {visiblePage && <CreatePage />}
      </div>
    </div>
  );
}

export default Login;
