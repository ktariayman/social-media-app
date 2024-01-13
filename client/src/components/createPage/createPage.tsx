import React from "react";
import { useAuthConfigurationContext } from "../../contexts/AuthentificationContext";
type Props = {}
function CreatePage() {
  const { setVisiblePage } = useAuthConfigurationContext()
  return <div className="blur">
    <div>
      <i className='exit_icon' onClick={() => setVisiblePage(false)}></i>

      createPage
    </div>

  </div>;
}

export default CreatePage;
