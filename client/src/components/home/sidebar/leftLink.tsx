import { Link, useNavigate } from "react-router-dom";

function LeftLink({ img, text, notification ,link}: any) {
  console.log('')
  const navigate = useNavigate()
  return (
    <div className='left_link hover2' onClick={()=>{navigate(link)}} >
      
      <img src={`../../../left/${img}.png`} alt=''   />
      {notification !== undefined ? (
        <div className='col'>
          <div className='col_1'>{text}</div>
          <div className='col_2'>{notification}</div>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
}
export default LeftLink;
