import { useRef, useState } from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import { useClickOutside } from '../../hooks';
import HeaderMiddle from './HeaderMiddle';
import HeaderRight from './HeaderRight';
import HeaderLeft from './HeaderLeft';
type Props = {
  page: string
}
function Header({ page }: Props) {
  const color = '#65676b';
  const { user } = useSelector((user: any) => ({ ...user }));

  const [showSearchMenu, setShowSearchMenu] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);

  const allmenu = useRef(null);
  const usermenu = useRef(null);

  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });
  return (
    <header style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
      <HeaderLeft color={color} setShowSearchMenu={setShowSearchMenu} showSearchMenu={showSearchMenu} />
      <HeaderMiddle page={page} color={color} />
      <HeaderRight page={page} user={user} usermenu={usermenu} showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu} />
    </header>
  );
}

export default Header;
