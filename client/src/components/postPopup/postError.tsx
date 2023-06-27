import React from "react";

function PostError({error,setError}:any) {
  return <div className="postError">
   <div>
   {error}
   </div>
  <button className="blue_btn" onClick={()=>{setError('')}}>try again</button>
  </div>;
}

export default PostError;
