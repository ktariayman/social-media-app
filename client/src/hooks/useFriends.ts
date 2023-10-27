
import React, { useEffect, useReducer } from "react";
import { getFriendsPageInfos } from "../functions/user";
import { friendsReducer } from "../reducers/friendsReducer";
const useFriends = (user: any) => {


 const [{ loading, error, data }, dispatch] = useReducer(friendsReducer, {
  loading: false,
  data: {},
  error: "",
 });
 useEffect(() => {
  getData();
 }, []);
 const getData = async () => {
  dispatch({ type: "FRIENDS_REQUEST" });
  const data = await getFriendsPageInfos(user.token);
  if (data.status === "ok") {
   dispatch({ type: "FRIENDS_SUCCESS", payload: data.data });
  } else {
   dispatch({ type: "FRIENDS_ERROR", payload: data.data });
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