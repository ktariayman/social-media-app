import React from "react";
type Props = {
  success: string
  setSucess: (v: string) => void
}
export default function PostSucess({ success, setSucess }: Props) {
  const resetError = () => { setSucess('') }
  return <div className="postSucess">
    <div>
      {success}
    </div>
    <button className="blue_btn" onClick={resetError}>try again</button>
  </div>;
}
