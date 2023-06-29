import {
  Logo,
  Search,
 } from '../../svg';
import { Link } from 'react-router-dom';
import SearchMenu from './SearchMenu';

function HeaderLeft({setShowSearchMenu,showSearchMenu,color}:any) {
  return (  
  <>
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
   <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
   )}
   </>
  )
}

export default HeaderLeft;
