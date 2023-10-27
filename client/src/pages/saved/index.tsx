import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSavedPostsByUserId } from "../../functions/post/getPostsByUserId";
import { Header, Post } from "../../components";
import SavedLeft from "./SavedLeft";
import SavedRight from "./SavedRight";
import "./style.css"
function Saved() {
  const { user } = useSelector((user: any) => ({ ...user }));
  const [data, setData] = useState<any>()
  useEffect(() => {
    getData()
  }, [])
  console.log('data', data);

  const getData = async () => {
    const data = await getSavedPostsByUserId(user?.token)
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
