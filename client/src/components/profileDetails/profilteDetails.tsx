import { useEffect, useState } from "react";
import Bio from "./Bio";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import EditDetails from "./editDetails";
import { IUser } from "../../ts/interface/user";
import updateProfileDetails from "../../functions/user/updateProfileDetails";
export default function ProfileDetails({ oldDetails, visitor, setOthername, showEdit, setShowEdit }: any) {
 const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
 const [details, setDetails] = useState<any>();
 useEffect(() => {
  setDetails(oldDetails);
  setInfos(oldDetails);
 }, [oldDetails]);
 const initial = {
  bio: details?.bio ? details.bio : "",
  otherName: details?.otherName ? details.otherName : "",
  job: details?.job ? details.job : "",
  workplace: details?.workplace ? details.workplace : "",
  highSchool: details?.highSchool ? details.highSchool : "",
  college: details?.college ? details.college : "",
  currentCity: details?.currentCity ? details.currentCity : "",
  hometown: details?.hometown ? details.hometown : "",
  relationship: details?.relationship ? details.relationship : "",
  instagram: details?.instagram ? details.instagram : "",
 };
 const [infos, setInfos] = useState<any>(initial);
 const [showBio, setShowBio] = useState<boolean>(false);
 const [max, setMax] = useState<number>(infos?.bio ? 100 - infos?.bio.length : 100);

 const updateDetails = async () => {
  try {
   const data = await updateProfileDetails(user.token, infos)
   setShowBio(false);
   setDetails(data);
   setOthername(data.otherName);
  } catch (error) {
  }
 };
 const handleChange = (e: any) => {
  const { name, value } = e.target;
  setInfos({ ...infos, [name]: value });
  setMax(100 - e.target.value.length);
 };
 return (
  <div className="profile_card">
   <div className="profile_card_header">Intro</div>
   {details?.bio && !showBio && !visitor && (
    <div className="info_col">
     <span className="info_text">{details?.bio}</span>
     <button
      className="gray_btn hover1"
      onClick={() => setShowBio(true)}
     >
      Edit Bio
     </button>
    </div>
   )}
   {!details?.bio && !showBio && !visitor && (
    <button
     className="gray_btn hover1 w100"
     onClick={() => setShowBio(true)}
    >
     Add Bio
    </button>
   )}
   {showBio && (
    <Bio
     infos={infos}
     max={max}
     handleChange={handleChange}
     setShowBio={setShowBio}
     updateDetails={updateDetails}
     placeholder="Add Bio"
     name="bio"
    />
   )}
   {details?.job && details?.workplace ? (
    <div className="info_profile">
     <img src="../../../icons/job.png" alt="" />
     works as {details?.job} at <b>{details?.workplace}</b>
    </div>
   ) : details?.job && !details?.workplace ? (
    <div className="info_profile">
     <img src="../../../icons/job.png" alt="" />
     works as {details?.job}
    </div>
   ) : (
    details?.workplace &&
    !details?.job && (
     <div className="info_profile">
      <img src="../../../icons/job.png" alt="" />
      works at {details?.workplace}
     </div>
    )
   )}
   {details?.relationship && (
    <div className="info_profile">
     <img src="../../../icons/relationship.png" alt="" />
     {details?.relationship}
    </div>
   )}
   {details?.college && (
    <div className="info_profile">
     <img src="../../../icons/studies.png" alt="" />
     studied at {details?.college}
    </div>
   )}
   {details?.highSchool && (
    <div className="info_profile">
     <img src="../../../icons/studies.png" alt="" />
     studied at {details?.highSchool}
    </div>
   )}
   {details?.currentCity && (
    <div className="info_profile">
     <img src="../../../icons/home.png" alt="" />
     Lives in {details?.currentCity}
    </div>
   )}
   {details?.hometown && (
    <div className="info_profile">
     <img src="../../../icons/home.png" alt="" />
     From {details?.hometown}
    </div>
   )}
   {details?.hometown && (
    <div className="info_profile">
     <img src="../../../icons/instagram.png" alt="" />
     <a
      href={`https://www.instagram.com/${details?.instagram}`}
      target="_blank"
     >
      {details?.instagram}
     </a>
    </div>
   )}
   {!visitor && (
    <button
     className="gray_btn hover1 w100"
     onClick={() => setShowEdit(true)}
    >
     Edit Details
    </button>
   )}
   {showEdit && !visitor && (
    <EditDetails
     details={details}
     handleChange={handleChange}
     updateDetails={updateDetails}
     infos={infos}
     setShowEdit={setShowEdit}
    />
   )}

   {!visitor && (
    <button className="gray_btn hover1 w100">Add Hobbies</button>
   )}
   {!visitor && (
    <button className="gray_btn hover1 w100">Add Featured</button>
   )}
  </div>
 );
}
