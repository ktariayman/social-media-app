import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { RegisterFormData } from '../../../helper';

const useRegisterForm = (user: any, setUser: any) => {
 const dispatch = useDispatch();
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const [success, setSuccess] = useState('');
 const [dateError, setDateError] = useState('');
 const [genderError, setGenderError] = useState('');


 const yearTemp = new Date().getFullYear();

 const years = Array.from(new Array(108), (val, index) => yearTemp - index);
 const months = Array.from(new Array(12), (val, index) => 1 + index);
 const getDays = () => {
  return new Date(user.bYear, user.bMonth, 0).getDate();
 };
 const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

 const registerSubmit = async (values: any) => {
  try {
   setLoading(true);
   const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, values);

   setError('');
   setSuccess(data.message);
   const { message, ...rest } = data;
   setTimeout(() => {
    dispatch({ type: 'LOGIN', payload: rest });
    Cookies.set('user', JSON.stringify(rest));
   }, 2000);
  } catch (error: any) {
   setLoading(false);
   setSuccess('');
   setError(error.response.data.message);
  }
 };

 const onSubmit = (values: any) => {
  let current_date = new Date();
  let picked_date = new Date(user.bYear, user.bMonth - 1, user.bDay);
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
  } else if (user.gender === '') {
   setDateError('');
   setGenderError('Please choose a gender. You can change who can see this later.');
  } else {
   setDateError('');
   setGenderError('');
   registerSubmit(values);
  }
 }
 const handleRegisterChange = (e: any) => {
  const { name, value } = e.target;
  setUser({ ...user, [name]: value });
 };
 return {
  loading,
  error,
  dateError,
  genderError,
  success,
  initialValues: RegisterFormData,
  user,
  days,
  months,
  years,
  onSubmit,
  setUser,
  handleRegisterChange
 };
};

export default useRegisterForm;