import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSavedPostsByUserId } from "../../functions/post/getPostsByUserId";
import { Header, Post } from "../../components";
import SavedLeft from "./SavedLeft";
import SavedRight from "./SavedRight";
import "./style.css"
import { IUser } from "../../ts/interface/user";
import Notice from "../../components/notice/Notice";
function Saved() {
  const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
  const [data, setData] = useState<any>()
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const data = await getSavedPostsByUserId(user?.token)
    if (!data) return
    setData(data)
  }

  return (

    <>
      <Header page="home" />
      < div className="saved" >
        <SavedLeft />
        <SavedRight data={data} token={user.token} />
      </div >
    </>
  )
    ;

}

export default Saved;
