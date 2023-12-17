import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { InputLogin } from '../../components';
import axios from 'axios';
import { usePasswordState, useResetPassConfigurationContext } from '../../contexts/ResetPasswordContext';
function CodeVerification() {
  const { code, setCode, setLoading, setError, userInfos, setVisible, visiblePages } = useResetPassConfigurationContext()
  const { email } = userInfos;
  const verifyCode = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/validateResetCode`, {
        email,
        code
      });
      setVisible(visiblePages.changePass);
      setError('');
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className='reset_form'>
      <div className='reset_form_header'>Code verification</div>
      <div className='reset_form_text'>Please enter code that been sent to your email.</div>
      <Formik
        enableReinitialize
        initialValues={{
          code
        }}
        onSubmit={() => {
          verifyCode();
        }}
      >
        {(formik) => (
          <Form>
            <InputLogin
              type='text'
              name='code'
              onChange={(e: any) => setCode(e.target.value)}
              placeholder='Code'
            />
            <div className='reset_form_btns'>
              <Link to='/login' className='gray_btn'>
                Cancel
              </Link>
              <button type='submit' className='blue_btn'>
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default CodeVerification;
