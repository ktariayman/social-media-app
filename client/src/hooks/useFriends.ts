
import { useEffect, useReducer } from "react";
import { getFriendsPageInfos } from "../functions/user";
import { friendsReducer } from "../reducers/friendsReducer";
import { FriendsActionType } from "../ts/enums";
import { FriendsType } from "../ts/types";
import { useSelector } from "react-redux";
import { IUser } from "../ts/interface/user";
const useFriends = () => {
 const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));


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