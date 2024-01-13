import {
  Menu,
  Messenger,
  Notifications,
} from '../../svg';
import { UserMenu } from '../../components';
import { Link } from 'react-router-dom';
import { IUser } from '../../ts/interface/user';
import { pagesType } from '../../ts/types';
type Props = {
  user: IUser;
  usermenu: React.RefObject<HTMLDivElement>;
  showUserMenu: boolean;
  setShowUserMenu: (show: boolean) => void;
  page: pagesType
}
function HeaderRight({ user, setShowUserMenu, showUserMenu, usermenu, page }: Props) {
  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu);
  };
  return (
    <div className='header_right'>
      <Link
        to="/profile"
        className={
          `profile_link profile_link_name hover1 
          ${page === "profile" ? "active_link" : ""}
          `}
      >
        <img src={user?.picture} alt="" />
        <span>{user?.first_name}</span>
      </Link>
      <div className='circle_icon hover1'>
        <Menu />
      </div>
      <div className='circle_icon hover1'>
        <Messenger />
      </div>
      <div className='circle_icon hover1'>
        <Notifications />
        <div className='right_notification'>5</div>
      </div>
      <div
        className={`profile_link circle_icon hover1 ${showUserMenu && 'active_header'}`}
        ref={usermenu}
      >
        <img src={user?.picture} alt='' onClick={handleUserMenuClick} />

        {showUserMenu && <UserMenu handleUserMenuClick={handleUserMenuClick} />}
      </div>
    </div>
  )
}

export default HeaderRight;
