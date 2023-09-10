import { Link } from "react-router-dom";
import {
  Friends,
  FriendsActive,
  Home,
  HomeActive,
  Market,
  Watch
} from '../../svg';
type Props = {
  page: string;
  color: string;
}
function HeaderMiddle({ page, color }: Props) {
  return (
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
  )
}

export default HeaderMiddle;
