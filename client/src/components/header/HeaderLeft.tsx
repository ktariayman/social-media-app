import {
  Logo,
  Search,
} from '../../svg';
import { Link, useNavigate } from 'react-router-dom';
import SearchMenu from './SearchMenu';
type Props = {
  setShowSearchMenu: (show: boolean) => void;
  showSearchMenu: boolean;
  color: string;
}
function HeaderLeft({ setShowSearchMenu, showSearchMenu, color }: Props) {
  const navigate = useNavigate()
  return (
    <>
      <div className='header_left'>
        <Link to='/' className='header_logo'>
          <div className='circle' onClick={() => { navigate('/') }}>
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
          <input type='text' placeholder='Search Devbook' className='hide_input' />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}
    </>
  )
}

export default HeaderLeft;
