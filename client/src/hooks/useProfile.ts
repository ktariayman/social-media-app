


import { useEffect, useReducer, useRef } from 'react';
import { useSelector } from 'react-redux';
import postReducer, { PostState } from '../reducers/postReducer';
import { PostActionType, ProfileActionType } from '../ts/enums';
import { getProfile } from '../functions';
import profileReducer, { ProfileState } from '../reducers/profileReducer';
import { useNavigate } from 'react-router-dom';

type ProfileProps = {
 usernameParams: string | undefined;
 userName: string;
}

const useProfile = ({ usernameParams, userName }: ProfileProps) => {
 const { user } = useSelector((user: any) => ({ ...user }));
 const navigate = useNavigate()
 const [profileState, dispatch] = useReducer(profileReducer, {
  loading: false,
  profile: [],
  error: '',
 } as ProfileState);
 useEffect(() => {
  handleGetData()
 }, [usernameParams])
 const handleGetData = async () => {
  try {
   dispatch({ type: ProfileActionType.PROFILE_REQUEST });
   const data = await getProfile(user?.token, userName);
   if (data.ok === false) navigate('/profile')
   dispatch({ type: ProfileActionType.PROFILE_SUCCESS, payload: data });
  } catch (error: any) {
   dispatch({ type: ProfileActionType.PROFILE_ERROR, payload: error.response.data.message });
  }
 };

 return {
  profileState,
 };
};

export default useProfile;
