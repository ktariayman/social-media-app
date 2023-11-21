import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { loginFormData, loginValidation } from '../../../helper';
const useLoginForm = () => {
 const [login, setLogin] = useState(loginFormData);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const navigate = useNavigate();
 const dispatch = useDispatch();

 const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setLogin({ ...login, [name]: value.toString() });
 };

 const loginSubmit = async () => {
  try {
   setLoading(true);
   const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
    email: login.email,
    password: login.password
   });
   dispatch({ type: 'LOGIN', payload: data });
   Cookies.set('user', JSON.stringify(data));
   navigate('/');
  } catch (error: any) {
   setLoading(false);
   setError(error.response.data.message);
  }
 };

 return { login, loading, error, handleLoginChange, loginSubmit, loginValidation };
};

export default useLoginForm
