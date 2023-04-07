import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginInput from '../input/inputLogin/InputLogin';
import * as Yup from 'yup';
import axios from 'axios';
import { validateCode } from '../../helper/validator';
function CodeVerification({ code, setCode, setLoading, setVisible, setError, userInfos }: any) {
  const { email } = userInfos;
  const verifyCode = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/validateResetCode`, {
        email,
        code
      });

      setVisible(3);
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
        validationSchema={validateCode}
        onSubmit={() => {
          verifyCode();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
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
