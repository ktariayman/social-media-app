import  { useRef, useState } from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import {useClickOutside} from '../../hooks';
import HeaderMiddle from './HeaderMiddle';
import HeaderRight from './HeaderRight';
import HeaderLeft from './HeaderLeft';

function Header({ page }: any) {
  const color = '#65676b';
  const { user } = useSelector((user: any) => ({ ...user }));
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  console.log(typeof setShowSearchMenu);

  const allmenu = useRef(null);
  const usermenu = useRef(null);

  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });
  return (
    <header style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
      <HeaderLeft color={color} setShowSearchMenu={setShowSearchMenu} showSearchMenu={showSearchMenu}/>
      <HeaderMiddle page={page} color={color}/>
      <HeaderRight user={user} usermenu={usermenu} showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu}  />
    </header>
  );
}

export default Header;
