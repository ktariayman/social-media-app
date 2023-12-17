import { useState } from 'react';
import DisplayAccessibility from './DisplayAccessibility';
import HelpSupport from './HelpSupport';
import SettingsPrivacy from './SettingsPrivacy';
import DefaultMenu from './DefaultMenu';
type Props = {
  handleUserMenuClick: () => void
}
export default function UserMenu({ handleUserMenuClick }: Props) {
  const [visible, setVisible] = useState<number>(0);
  return (
    <div>
      {visible >= 0 && (
        <div className='mmenu'>
          {visible === 0 && (
            <DefaultMenu
              setVisible={setVisible}
              handleUserMenuClick={handleUserMenuClick}
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
