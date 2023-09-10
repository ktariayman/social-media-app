import { useState } from 'react';
import DisplayAccessibility from './DisplayAccessibility';
import HelpSupport from './HelpSupport';
import SettingsPrivacy from './SettingsPrivacy';
import DefaultMenu from './DefaultMenu';
import { useLogout } from '../../hooks';
type Props = {
  user: any
  setShowUserMenu: (show: boolean) => void
}
export default function UserMenu({ user, setShowUserMenu }: any) {
  const [visible, setVisible] = useState<number>(0);
  const logout = useLogout()
  return (
    <div>
      {visible < 0 && (
        <div></div>
      )}
      {visible >= 0 && (
        <div className='mmenu'>
          {visible === 0 && (
            <DefaultMenu
              first_name={user?.first_name}
              last_name={user?.last_name}
              picture={user?.picture}
              setVisible={setVisible}
              setShowUserMenu={setShowUserMenu}
              logout={logout}
            />
          )}
          {visible === 1 && <SettingsPrivacy setVisible={setVisible} />}
          {visible === 2 && <HelpSupport setVisible={setVisible} />}
          {visible === 3 && <DisplayAccessibility setVisible={setVisible} />}
        </div>
      )}
    </div>


  );
}
