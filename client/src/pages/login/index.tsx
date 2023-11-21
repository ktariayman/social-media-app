import './style.css';
import { LoginForm, RegisterForm } from '../../components';
import { AuthConfigurationContextProvider, useAuthConfigurationContext } from '../../contexts/AuthentificationContext';
import CreatePage from '../../components/createPage/createPage';
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
      <div className='login_wrapper'>
        <LoginForm />
        {visible && <RegisterForm />}
        {visiblePage && <CreatePage />}
      </div>
    </div>
  );
}

export default Login;
