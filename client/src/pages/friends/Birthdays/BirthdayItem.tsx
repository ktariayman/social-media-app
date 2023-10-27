import { useNavigate } from "react-router-dom";

function BirthdayItem({ user }: any) {
 const navigate = useNavigate()
 return (
  <div className='birthday'>
   <div className='birthday_header' style={{ height: '100%' }}>

    <img src={user?.picture} alt=''
     onClick={() => { navigate(`/profile/${user.username}`) }}
    />
    <div style={{ display: 'flex', width: '100%', height: '80%', flexDirection: "column", gap: '10px', marginTop: 'auto', marginBottom: 'auto' }}>
     <div style={{ display: 'flex', width: '100%', justifyContent: "space-between" }}
     >
      <h3>{user?.name}</h3>
      <p><b>{user?.age}</b> years old</p>
     </div>
     <div
      className='open_post hover2'
     >
      Wish to {user.name} happy birthday !! <span style={{ marginRight: '20px' }}><i className='emoji_icon_large '></i></span>
     </div>
    </div>
   </div>
  </div>
 )
}

export default BirthdayItem;
