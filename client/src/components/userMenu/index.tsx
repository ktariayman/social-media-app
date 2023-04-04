import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DisplayAccessibility from './DisplayAccessibility';
import HelpSupport from './HelpSupport';
import SettingsPrivacy from './SettingsPrivacy';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import DefaultMenu from './DefaultMenu';
export default function UserMenu({ user }: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(0);
  const logout = () => {
    Cookies.set('user', '');
    dispatch({
      type: 'LOGOUT'
    });
    navigate('/login');
  };
  return (
    <div className='mmenu'>
      {visible === 0 && (
        <DefaultMenu
          first_name={user?.first_name}
          last_name={user?.last_name}
          picture={user?.picture}
          setVisible={setVisible}
          logout={logout}
        />
      )}
      {visible === 1 && <SettingsPrivacy setVisible={setVisible} />}
      {visible === 2 && <HelpSupport setVisible={setVisible} />}
      {visible === 3 && <DisplayAccessibility setVisible={setVisible} />}
    </div>
  );
}
