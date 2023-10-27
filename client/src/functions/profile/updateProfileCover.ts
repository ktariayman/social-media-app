import axios from "axios"

export const updateProfileCoverService = async (url: string, token: string) => {
 const { data } = await axios.put(
  `${process.env.REACT_APP_BACKEND_URL}/updateProfileCover`,
  {
   url,
  },
  {
   headers: {
    Authorization: `Bearer ${token}`,
   },
  }
 );
 return "ok";
}
