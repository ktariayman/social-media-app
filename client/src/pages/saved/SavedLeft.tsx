import { Link } from "react-router-dom";
function SavedLeft() {

 return (
  <div className="saved_left">
   <div className="friends_left_header">
    <h3>Records</h3>
    <div className="small_circle">
     <i className="settings_filled_icon"></i>
    </div>
   </div>
   <div className="friends_left_wrap">
    <div className="mmenu_item hover3">
     <div className="small_circle">
      <i className="saved_posts_icon"></i>
     </div>
     <span>Saved items</span>
     <div className="rArrow">
      <i className="right_icon"></i>
     </div>
    </div>
   </div>
  </div>
 );
}

export default SavedLeft;
