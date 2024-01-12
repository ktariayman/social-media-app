import { useEffect, useReducer, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProfileActionType } from '../ts/enums';
import { getProfile } from '../functions';
import profileReducer from '../reducers/profileReducer';
import { useNavigate } from 'react-router-dom';
import listImages from '../functions/profile/Iistmages';
import { useMediaQuery } from 'react-responsive';
import { Profile } from '../ts/types';
import { IUser } from '../ts/interface/user';

type ProfileProps = {
 usernameParams: string | undefined;
 userName: string;
}

const useProfile = ({ usernameParams, userName }: ProfileProps) => {
 const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
 var visitor = userName === user.username ? false : true;
 const navigate = useNavigate()
 const [profileState, dispatch] = useReducer(profileReducer, {
  loading: false,
  profile: {} as Profile,
  error: '',
 });
 const [othername, setOthername] = useState("");
 useEffect(() => {
  setOthername(profileState.profile?.details?.otherName!);
 }, [profileState.profile]);
 const [showCoverMenu, setShowCoverMenu] = useState(false)
 const [photos, setPhotos] = useState({});

 const profileTopRef = useRef<HTMLDivElement>(null);
 const leftSide = useRef<HTMLDivElement>(null);
 const [height, setHeight] = useState<any>();
 const [leftHeight, setLeftHeight] = useState<any>();

 const [scrollHeight, setScrollHeight] = useState<number>(0);

 const check = useMediaQuery({
  query: "(min-width:901px)",
 });
 const getScroll = () => {
  setScrollHeight(window.pageYOffset);
 };
 useEffect(() => {
  handleGetData()
 }, [usernameParams])
 const handleGetData = async () => {
  try {
   dispatch({ type: ProfileActionType.PROFILE_REQUEST });
   const data = await getProfile(user?.token, userName);
   if (data.ok === false) {
    navigate('/profile')
   } else {
    const responseImages = await listImages(user?.token, userName)
    setPhotos(responseImages.data)
   }
   dispatch({ type: ProfileActionType.PROFILE_SUCCESS, payload: data });
  } catch (error: any) {
   dispatch({ type: ProfileActionType.PROFILE_ERROR, payload: error.response.data.message });
  }
 };
 useEffect(() => {
  if (profileTopRef.current) {
   setHeight(profileTopRef.current.clientHeight + 300);
  }
  if (leftSide.current) {
   setLeftHeight(leftSide.current.clientHeight);
  }
  window.addEventListener("scroll", getScroll, { passive: true });
  return () => {
   window.addEventListener("scroll", getScroll, { passive: true });
  };
 }, [profileState.loading, scrollHeight]);
 return {
  profileState,
  showCoverMenu,
  setShowCoverMenu,
  othername,
  setOthername,
  photos, setPhotos,
  dispatch,
  visitor,
  profileTopRef,
  leftSide,
  height,
  setHeight,
  leftHeight,
  setLeftHeight,
  scrollHeight,
  setScrollHeight,
  check,
  getScroll
 };
};

export default useProfile;
