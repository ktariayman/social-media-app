import { Form, Formik } from 'formik';
import { useRef, useState } from 'react';
import DateOfBirthSelect from './DateOfBirthSelect';
import GenderSelect from './GenderSelect';
import DotLoader from 'react-spinners/DotLoader';
import { useAuthConfigurationContext } from '../../../contexts/AuthentificationContext';
import { useClickOutside } from '../../../hooks';
import { RegisterFormData, registerValidation } from '../../../helper';
import { InputRegister } from '../../../components';
import useRegisterForm from '../hooks/useRegisterForm';

type Props = {}
function RegisterForm() {
  const { setVisible } = useAuthConfigurationContext()
  const registerRef = useRef(null)
  useClickOutside(registerRef, () => {
    setVisible(false)
  });
  const [user, setUser] = useState(RegisterFormData);
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const {
    loading,
    error,
    success,
    initialValues,
    years,
    months,
    days,
    onSubmit,
    genderError,
    dateError,
  } = useRegisterForm(user);



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
          initialValues={initialValues}
          validationSchema={registerValidation}
          onSubmit={() => onSubmit(user)}
        >
          {(formik) => (
            <Form className='register_form'>
              <div className='reg_line'>
                <InputRegister
                  type='text'
                  placeholder='First name'
                  name='first_name'
                  onInput={handleRegisterChange}
                />
                <InputRegister
                  type='text'
                  placeholder='Surname'
                  name='last_name'
                  onInput={handleRegisterChange}
                />
              </div>
              <div className='reg_line'>
                <InputRegister
                  type='text'
                  placeholder='Mobile number or email address'
                  name='email'
                  onInput={handleRegisterChange}
                />
              </div>
              <div className='reg_line'>
                <InputRegister
                  type='password'
                  placeholder='New password'
                  name='password'
                  onInput={handleRegisterChange}
                />
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Date of birth <i className='info_icon'></i>
                </div>
                <DateOfBirthSelect
                  bDay={user.bDay}
                  bMonth={user.bMonth}
                  bYear={user.bYear}
                  days={days}
                  months={months}
                  years={years}
                  dateError={dateError}
                  handleRegisterChange={handleRegisterChange}
                />
              </div>
              <div className='reg_col' style={{ width: '100%' }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: "2fr 1fr", width: '100%' }}>

                <div className='reg_btn_wrapper'>
                  <button className='blue_btn haveAccount' onClick={() => setVisible(false)}>
                    Already have an account ?
                  </button>
                </div>

                <div className='reg_btn_wrapper'>
                  <button type={"submit"} className='blue_btn open_signup'>Sign Up</button>
                </div>
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
