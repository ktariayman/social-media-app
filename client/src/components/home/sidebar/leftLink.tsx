import { useNavigate } from "react-router-dom";
type Props = {
  text?: string
  img?: string
  notification?: string
  link?: string
}
function LeftLink({ img, text, notification, link }: Props) {
  const navigate = useNavigate()
  return (
    <div className='left_link hover2' onClick={() => { navigate(link!) }} >

      <img src={`../../../left/${img}.png`} alt='' />
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
