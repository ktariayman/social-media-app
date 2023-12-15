
import React, { useEffect, useReducer } from "react";
import { getFriendsPageInfos } from "../functions/user";
import { friendsReducer } from "../reducers/friendsReducer";
import { FriendsActionType } from "../ts/enums";
import { FriendsType } from "../ts/types";
const useFriends = (user: any) => {


 const [{ loading, error, data }, dispatch] = useReducer(friendsReducer, {
  loading: false,
  data: {} as FriendsType,
  error: "",
 });
 useEffect(() => {
  getData();
 }, []);
 const getData = async () => {
  dispatch({ type: FriendsActionType.PROFILE_REQUEST });
  const data = await getFriendsPageInfos(user.token);
  if (data.status === "ok") {
   dispatch({ type: FriendsActionType.PROFILE_SUCCESS, payload: data.data });
  } else {
   dispatch({ type: FriendsActionType.PROFILE_ERROR, payload: data.data });
  }
 };
 return {
  data,
  getData,
  loading,
  error,
  dispatch
 }
}

export default useFriends