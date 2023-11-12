import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    Cookies.set('user', '');
    dispatch({
      type: 'LOGOUT'
    });
    navigate('/login');
  };

  return logout;
};

export default useLogout;
