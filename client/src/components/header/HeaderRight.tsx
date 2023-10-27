import {
  Menu,
  Messenger,
  Notifications,
} from '../../svg';
import { UserMenu } from '../../components';
import { Link } from 'react-router-dom';
type Props = {
  user: any;
  usermenu: React.RefObject<HTMLDivElement>;
  showUserMenu: boolean;
  setShowUserMenu: (show: boolean) => void;
  page: string
}
function HeaderRight({ user, setShowUserMenu, showUserMenu, usermenu, page }: Props) {

  return (
    <div className='header_right'>
      <Link
        to="/profile"
        className={`profile_link hover1 ${page === "profile" ? "active_link" : ""
          }`}
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
        <img src={user?.picture} alt='' onClick={() => {
          setShowUserMenu(!showUserMenu);
        }} />

        {showUserMenu && <UserMenu user={user} setShowUserMenu={setShowUserMenu} />}
      </div>
    </div>
  )
}

export default HeaderRight;
