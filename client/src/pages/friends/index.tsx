import React, { useEffect, useReducer } from "react";
import './style.css'
import { Header } from "../../components";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FriendsLeft from "./FriendsLeft";
import FriendsRight from "./FriendsRight";
import useFriends from "../../hooks/useFriends";
function Friends() {
 const { type } = useParams();
 const { user } = useSelector((state: any) => ({ ...state }));
 const { data, getData } = useFriends(user)

 return (
  <>
   <Header page="friends" />
   <div className="friends">
    <FriendsLeft />
    <FriendsRight data={data} getData={getData} />
   </div>
  </>
 );
}

export default Friends;
