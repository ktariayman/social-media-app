import { Link } from "react-router-dom";
import { Plus } from "../../svg";
type Props = {
 setVisible: (b: boolean) => void
}
function CreateStoriesLeft({ setVisible }: Props) {

 return (
  <div className="saved_left">
   <div className="friends_left_header" style={{ padding: "12px" }}>
    <h3>Votre Story</h3>
    <div className="small_circle">
     <i className="settings_filled_icon"></i>
    </div>
   </div>
   {/* <div className="friends_left_wrap" onClick={() => { setVisible(true) }}>
    <div className="mmenu_item hover3">
     <h4>create Story</h4>
     <div className="plus_story" >
      <Plus color='#fff' />
     </div>
    </div>
   </div> */}
  </div>
 );
}

export default CreateStoriesLeft;
