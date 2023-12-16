import { Link } from "react-router-dom";
import { Dots } from "../../../svg";
import { BeatLoader } from "react-spinners";

type Props = {
 nbreOfFriends: number
 photos: any
 loading: boolean
}
export default function ProfileMenu({ nbreOfFriends, photos, loading }: Props) {
 const color = '#65676b';

 return (
  <div className="profile_menu_wrap">
   <div className="profile_menu">
    <Link to="/" className="profile_menu_active">
     Posts
    </Link>
    <Link to="/" className="hover1">
     About
    </Link>
    <Link to="/" className="hover1">
     Friends
     <span style={{ fontSize: "16px", color: "#1876f2 " }}>
      ({!loading && nbreOfFriends && <span>{nbreOfFriends}</span>})
     </span>
    </Link>
    <Link to="/" className="hover1">
     Photos
     <span style={{ fontSize: "16px", color: "#1876f2 " }}>
      ({!loading && photos.total_count && <span>{photos.total_count}</span>})
     </span>
    </Link>
    <Link to="/" className="hover1">
     Videos
    </Link>
    <Link to="/" className="hover1">
     Check-ins
    </Link>
    <Link to="/" className="hover1">
     More
    </Link>
    <div className="p10_dots">
     <Dots color={color} />
    </div>
   </div>
  </div>
 );
}
