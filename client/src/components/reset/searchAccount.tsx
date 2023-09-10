import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { InputLogin } from '../../components';
import { validateEmail } from '../../helper';
type Props = {
  email: string
  setEmail: (e: string) => void
  error: string
  setError: (s: string) => void
  setLoading: (b: boolean) => void
  setUserInfos: (data: any) => void
  setVisible: (n: number) => void
}
export default function SearchAccount({
  email,
  setEmail,
  error,
  setError,
  setLoading,
  setUserInfos,
  setVisible
}: Props) {
  const handleSearch = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/findUserByEmail`, {
        email
      });
      setUserInfos(data);
      setVisible(1);
      setError('');
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className='reset_form'>
      <div className='reset_form_header'>Find Your Account</div>
      <div className='reset_form_text'>
        Please enter your email address or mobile number to search for your account.
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          email
        }}
        validationSchema={validateEmail}
        onSubmit={() => {
          handleSearch();
        }}
      >
        {(formik) => (
          <Form>
            <InputLogin
              type='text'
              name='email'
              onChange={(e: any) => setEmail(e.target.value)}
              placeholder='Email address or phone number'
            />
            {error && <div className='error_text'>{error}</div>}
            <div className='reset_form_btns'>
              <Link to='/login' className='gray_btn'>
                Cancel
              </Link>
              <button type='submit' className='blue_btn'>
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
