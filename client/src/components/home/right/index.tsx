import { useFriends } from '../../../hooks';
import { Dots, NewRoom, Search } from '../../../svg';
import { IUser } from '../../../ts/interface/user';
import { Friend, FriendsType } from '../../../ts/types';
import Contact from './Contact';
import './style.css';

function RightHome({ user }: { user: IUser }) {
  const color = '#65676b';
  const { data }: { data: FriendsType } = useFriends()
  return (
    <div className='right_home'>
      <div className='heading'>Sponsored</div>
      <div className='splitter1'></div>
      <div className='contacts_wrap'>
        <div className='contacts_header'>
          <div className='contacts_header_left'>Contacts</div>
          <div className='contacts_header_right'>
            <div className='contact_circle hover1'>
              <NewRoom color={color} />
            </div>
            <div className='contact_circle hover1'>
              <Search color={color} />
            </div>
            <div className='contact_circle hover1'>
              <Dots color={color} />
            </div>
          </div>
        </div>
        <div className='contacts_list'>
          {data.friends &&
            data.friends.map((friend: Friend) => (
              <Contact
                friend={friend}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
export default RightHome;
