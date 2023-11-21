import { Link } from "react-router-dom";
type Props = {
  link?: string
  img?: string
  name?: string
}
function Shortcut({ link, img, name }: Props) {
  return (
    <Link to={link!} rel='noreferrer' className='left_link shortcut_item '>
      <img src={img} alt='' />
      <span>{name}</span>
    </Link>
  );
}
export default Shortcut;
