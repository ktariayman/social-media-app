import {
 Menu,
 Messenger,
 Notifications,
} from '../../svg';
import { UserMenu } from '../../components';
function HeaderRight({user,setShowUserMenu,showUserMenu,usermenu}:any) {

  return (
   <div className='header_right'>
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
          <img src={user?.picture} alt=''  onClick={() => {
            setShowUserMenu((prev:any) => !prev);
          }}/>

          {showUserMenu && <UserMenu user={user} setShowUserMenu={setShowUserMenu}/>}
        </div>
      </div>
  )
}

export default HeaderRight;
