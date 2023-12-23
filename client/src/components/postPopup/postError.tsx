import React from "react";
type Props = {
  error: string
  setError: (v: string) => void
}
function PostError({ error, setError }: Props) {
  const resetError = () => { setError('') }
  return <div className="postError">
    <div>
      {error}
    </div>
    <button className="blue_btn" onClick={resetError}>try again</button>
  </div>;
}

export default PostError;
