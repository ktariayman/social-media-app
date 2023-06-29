import { Link } from "react-router-dom";

function Shortcut({ link, img, name }: any) {
  return (
    <Link to={link} rel='noreferrer' className='shortcut_item'>
      <img src={img} alt='' />
      <span>{name}</span>
    </Link>
  );
}
export default Shortcut;
