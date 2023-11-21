import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputRegister } from '../../components';
import DateOfBirthSelect from './DateOfBirthSelect';
import GenderSelect from './GenderSelect';
import { registerValidation, RegisterFormData } from '../../helper';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';
import DotLoader from 'react-spinners/DotLoader';
import { useClickOutside } from '../../hooks';
import { useAuthConfigurationContext } from '../../contexts/AuthentificationContext';

type Props = {}
function RegisterForm({ }: Props) {
  const { setVisible } = useAuthConfigurationContext()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(RegisterFormData);

  const [dateError, setDateError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const registerRef = useRef(null)
  useClickOutside(registerRef, () => {
    setVisible(false)
  });
  const { first_name, last_name, email, password, bYear, bMonth, bDay, gender } = user;
  const yearTemp = new Date().getFullYear();
  const handleRegisterChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);
  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, {
        first_name,
        last_name,
        email,
        password,
        bYear,
        bMonth,
        bDay,
        gender
      });
      setError('');
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: 'LOGIN', payload: rest });
        Cookies.set('user', JSON.stringify(rest));
        navigate('/');
      }, 2000);
    } catch (error: any) {
      setLoading(false);
      setSuccess('');
      setError(error.response.data.message);
    }
  };
  return (
    <div className='blur' >
      <div className='register' ref={registerRef}>
        <div className='register_header'>
          <i className='exit_icon' onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);

            if (current_date.getTime() - picked_date.getTime() < atleast14.getTime()) {
              setDateError(
                'It looks like you have entered the wrong information. Please make sure that you use your real date of birth.'
              );
            } else if (current_date.getTime() - picked_date.getTime() > noMoreThan70.getTime()) {
              setDateError(
                'It looks like you have entered the wrong information. Please make sure that you use your real date of birth.'
              );
            } else if (gender === '') {
              setDateError('');
              setGenderError('Please choose a gender. You can change who can see this later.');
            } else {
              setDateError('');
              setGenderError('');
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className='register_form'>
              <div className='reg_line'>
                <InputRegister
                  type='text'
                  placeholder='First name'
                  name='first_name'
                  onChange={handleRegisterChange}
                />
                <InputRegister
                  type='text'
                  placeholder='Surname'
                  name='last_name'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_line'>
                <InputRegister
                  type='text'
                  placeholder='Mobile number or email address'
                  name='email'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_line'>
                <InputRegister
                  type='password'
                  placeholder='New password'
                  name='password'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Date of birth <i className='info_icon'></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                />
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Gender <i className='info_icon'></i>
                </div>

                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>
              <div className='reg_infos'>
                By clicking Sign Up, you agree to our <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive SMS notifications from us and can
                opt out at any time.
              </div>
              <div className='reg_btn_wrapper'>
                <button className='blue_btn open_signup'>Sign Up</button>
              </div>
              <div className='reg_btn_wrapper'>
                <button className='blue_btn haveAccount' onClick={() => setVisible(false)}>
                  Already have an account ?
                </button>
              </div>
              <DotLoader color='#1876f2' loading={loading} size={30} />
              {error && <div className='error_text'>{error}</div>}
              {success && <div className='success_text'>{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RegisterForm;
