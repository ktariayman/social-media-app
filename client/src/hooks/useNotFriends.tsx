import React, { useEffect, useState } from "react";
import { usersNotFriends } from "../functions";
import { useSelector } from "react-redux";
import { IUser } from "../ts/interface/user";

const useNotFriends = () => {
 const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
 const [notFriends, setNotFriends] = useState([])
 useEffect(() => {
  handleNotFriends()
 }, [])
 const handleNotFriends = async () => {
  const data = await usersNotFriends(user.token)
  setNotFriends(data)
 }
 return { notFriends }
};

export default useNotFriends;
