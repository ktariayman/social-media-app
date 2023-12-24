import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginHandler } from '../../../functions/user/login'
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { loginFormData, loginValidation } from '../../../helper';
import { LoginFormValues } from '../../../ts/interface/user';
const useLoginForm = () => {
 const [login, setLogin] = useState<LoginFormValues>(loginFormData);
 const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<string>('');
 const navigate = useNavigate();
 const dispatch = useDispatch();

 const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setLogin({ ...login, [name]: value.toString() });
 };

 const loginSubmit: () => Promise<void> = async () => {
  try {
   setLoading(true);
   const data = await loginHandler(login)
   dispatch({ type: 'LOGIN', payload: data });
   Cookies.set('user', JSON.stringify(data));
   navigate('/');
  } catch (error: any) {
   setLoading(false);
   setError(error.response.data.message);
  }
 };

 return {
  login,
  loading,
  error,
  handleLoginChange,
  loginSubmit,
  loginValidation
 };
};

export default useLoginForm
