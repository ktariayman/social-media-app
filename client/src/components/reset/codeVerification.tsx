import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { InputLogin } from '../../components';
import { useResetPassConfigurationContext } from '../../contexts/ResetPasswordContext';
import { validateResetCode } from '../../functions/user/validateResetCode';
function CodeVerification() {
  const { code, setCode, setLoading, setError, userInfos, setVisible, visiblePages } = useResetPassConfigurationContext()
  const { email } = userInfos;
  const verifyCode = async () => {
    try {
      setLoading(true);
      await validateResetCode(email, code)
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
