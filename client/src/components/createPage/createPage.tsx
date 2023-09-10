import React from "react";
type Props = {
  setVisiblePage: React.Dispatch<React.SetStateAction<boolean>>;

}
function CreatePage({ setVisiblePage }: Props) {
  return <div className="blur">
    <div>
      <i className='exit_icon' onClick={() => setVisiblePage(false)}></i>

      createPage
    </div>

  </div>;
}

export default CreatePage;
