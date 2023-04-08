import LeftLink from './leftLink';
import './style.css';
import { left } from './data';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowDown1 } from '../../../svg';
import { useState } from 'react';
import Shortcut from './Shortcut';
function SideBar({ user }: any) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  return (
    <div className='left_home scrollbar'>
      <Link to='/profile' className='left_link hover2'>
        <img src={user?.picture} alt='' />
        <span>
          {user?.first_name} {user.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((link: any, i: any) => (
        <LeftLink key={i} img={link.img} text={link.text} notification={link.notification} />
      ))}
      {!visible && (
        <div
          className='left_link hover2'
          onClick={() => {
            setVisible(true);
          }}
        >
          <div className='small_circle'>
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )}
      {visible && (
        <div className='more_left'>
          {left.slice(8, left.length).map((link, i) => (
            <LeftLink key={i} img={link.img} text={link.text} notification={link.notification} />
          ))}
          <div
            className='left_link hover2 '
            onClick={() => {
              setVisible(false);
            }}
          >
            <div className='small_circle rotate360'>
              <ArrowDown1 />
            </div>
            <span>Show less</span>
          </div>
        </div>
      )}
      <div className='splitter'></div>
      <div className='shortcut'>
        <div className='heading'>Your Shortcuts</div>
        <div className='edit_shortcut'>Edit</div>
      </div>
      <div className='shortcut_list'>
        <div
          onClick={() => {
            navigate('/youtube');
          }}
        >
          <Shortcut img='../../images/ytb.png' name='My Youtube channel' />
        </div>
        <div
          onClick={() => {
            navigate('/linkedin');
          }}
        >
          <Shortcut img='../../images/linkedin.png' name='My Linkedin ' />
        </div>
        <div
          onClick={() => {
            navigate('/spotify');
          }}
        >
          <Shortcut img='../../images/spotify.png' name='Spotify: Listen to music ' />
        </div>
      </div>
    </div>
  );
}
export default SideBar;
