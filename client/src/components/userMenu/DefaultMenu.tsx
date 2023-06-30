import { Link, useNavigate } from 'react-router-dom';

function DefaultMenu({ picture, first_name, last_name, setVisible, logout ,setShowUserMenu}: any) {
  const navigate =useNavigate()
  console.log('type of setShowUserMenu ', setShowUserMenu);
  
  return (
    <div>
      
        <div className='mmenu_flex'>

        <div  className='mmenu_flex_child '>
          <img src={picture ? picture : ''} alt='' onClick={()=>{navigate('/profile')}}/>
          <div className='mmenu_col'>
          <span >
              {first_name && first_name} {last_name && last_name}
            </span>
            <span>See your profile</span>
          </div>
            
        </div>
       
        <div
           className='small_circle'
          onClick={() => {
            setShowUserMenu((prev:any) => !prev);
          }}         >
            <i className='exit_icon' ></i>
        </div>
        </div>
      <div className='mmenu_splitter'></div>
      <div className='mmenu_main hover3'>
        <div className='small_circle'>
          <i className='report_filled_icon'></i>
        </div>
        <div className='mmenu_col'>
          <div className='mmenu_span1'>Give feedback</div>
          <div className='mmenu_span2'>Help us improve facebook</div>
        </div>
      </div>
      <div className='mmenu_splitter'></div>
      <div
        className='mmenu_item hover3'
        onClick={() => {
          setVisible(1);
        }}
      >
        <div className='small_circle'>
          <i className='settings_filled_icon'></i>
        </div>
        <span>Settings & privacy</span>
        <div className='rArrow'>
          <i className='right_icon'></i>
        </div>
      </div>
      <div
        className='mmenu_item hover3'
        onClick={() => {
          setVisible(2);
        }}
      >
        <div className='small_circle'>
          <i className='help_filled_icon'></i>
        </div>
        <span>Help & support</span>
        <div className='rArrow'>
          <i className='right_icon'></i>
        </div>
      </div>
      <div
        className='mmenu_item hover3'
        onClick={() => {
          setVisible(3);
        }}
      >
        <div className='small_circle'>
          <i className='dark_filled_icon'></i>
        </div>
        <span>Display & Accessibility</span>
        <div className='rArrow'>
          <i className='right_icon'></i>
        </div>
      </div>
      <div
        className='mmenu_item hover3'
        onClick={() => {
          logout();
        }}
      >
        <div className='small_circle'>
          <i className='logout_filled_icon'></i>
        </div>
        <span>Logout</span>
      </div>
    </div>
  );
}

export default DefaultMenu;
