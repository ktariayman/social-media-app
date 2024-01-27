import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { InputLogin } from '../../../components';
import DotLoader from 'react-spinners/DotLoader';
import useLoginForm from '../hooks/useLoginForm';
import { useAuthConfigurationContext } from '../../../contexts/AuthentificationContext';
type Props = {}
function LoginForm() {
  const { setVisible, setVisiblePage } = useAuthConfigurationContext()
  const { error, handleLoginChange, loading, login, loginSubmit, loginValidation } = useLoginForm()
  const { email, password } = login;
  return (
    <div className='login_wrap'>
      <div className='login_1'>
        <img src='../../icons/devbook-login-logo.png' width={400} alt='' />
        <p style={{ fontWeight: "400", fontSize: "30px" }}>Recent Logins</p>
        <p>Click your picture or Add Account.</p>
        <p>demo account : user@gmail.com , mdps : user123456</p>
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
            onSubmit={loginSubmit}
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
