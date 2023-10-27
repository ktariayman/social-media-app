import axios from "axios"

const listImages = async (token: string, userName: string) => {
 const path = `${userName}/*`;
 const max = 30;
 const sort = "desc";
 const images = await axios.post(
  `${process.env.REACT_APP_BACKEND_URL}/listImages`,
  { path, sort, max },
  {
   headers: {
    Authorization: `Bearer ${token}`,
   },
  }
 );
 return images
}

export default listImages