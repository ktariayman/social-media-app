import React, { useRef, useState } from 'react';
import './style.css';
import {
  ArrowDown1,
  Friends,
  FriendsActive,
  Home,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch
} from '../../svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useClickOutside from '../../hooks/useClickOutside';
import SearchMenu from './SearchMenu';
import UserMenu from '../userMenu';
function Header({ page }: any) {
  const color = '#65676b';
  const { user } = useSelector((user: any) => ({ ...user }));
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  console.log(typeof setShowSearchMenu);

  const allmenu = useRef(null);
  const usermenu = useRef(null);

  useClickOutside(allmenu, () => {
    setShowAllMenu(false);
  });
  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });
  return (
    <header>
      <div className='header_left'>
        <Link to='/' className='header_logo'>
          <div className='circle'>
            <Logo />
          </div>
        </Link>
        <div
          className='search search1'
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input type='text' placeholder='Search Facebook' className='hide_input' />
        </div>
      </div>
      {showSearchMenu && (
        // <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} token={user.token} />
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}
      <div className='header_middle'>
        <Link
          to='/'
          className={`middle_icon ${page === 'home' ? 'active' : 'hover1'}`}
          // onClick={() => getAllPosts()}
        >
          {page === 'home' ? <HomeActive /> : <Home color={color} />}
        </Link>
        <Link to='/friends' className={`middle_icon ${page === 'friends' ? 'active' : 'hover1'}`}>
          {page === 'friends' ? <FriendsActive /> : <Friends color={color} />}
        </Link>{' '}
        *
        <Link to='/' className='middle_icon hover1'>
          <HomeActive />
        </Link>
        <Link to='/friends' className='middle_icon hover1'>
          <Friends color={color} />
        </Link>
        <Link to='/' className='middle_icon hover1'>
          <Watch color={color} />
          <div className='middle_notification'>9+</div>
        </Link>
        <Link to='/' className='middle_icon hover1'>
          <Market color={color} />
        </Link>
      </div>
      <div className='header_right'>
        <Link
          to='/profile'
          className={`profile_link hover1 ${page === 'profile' ? 'active_link' : ''}`}
        >
          <img src={user?.picture} alt='' />
          <span>{user?.first_name}</span>
        </Link>
        <div className='circle_icon hover1'>
          <Menu />
        </div>{' '}
        <div className='circle_icon hover1'>
          <Messenger />
        </div>
        <div className='circle_icon hover1'>
          <Notifications />
          <div className='right_notification'>5</div>
        </div>
        <div className={`circle_icon hover1 ${showUserMenu && 'active_header'}`} ref={usermenu}>
          <div
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
          >
            <div style={{ transform: 'translateY(2px)' }}>
              <ArrowDown1 />
            </div>
          </div>

          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}

export default Header;
