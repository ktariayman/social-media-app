import { useRef, useState } from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import { useClickOutside } from '../../hooks';
import HeaderMiddle from './HeaderMiddle';
import HeaderRight from './HeaderRight';
import HeaderLeft from './HeaderLeft';
import { pagesType } from '../../ts/types';
import { IUser } from '../../ts/interface/user';
type Props = {
  page?: pagesType
}
function Header({ page = "home" }: Props) {
  const color = '#65676b';
  const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
  const [showSearchMenu, setShowSearchMenu] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);

  const usermenu = useRef(null);

  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });
  return (
    <div className='headerContainer'>
      <header >
        <HeaderLeft color={color} setShowSearchMenu={setShowSearchMenu} showSearchMenu={showSearchMenu} />
        <HeaderMiddle page={page} color={color} />
        <HeaderRight page={page} user={user} usermenu={usermenu} showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu} />
      </header>
    </div>
  );
}

export default Header;
