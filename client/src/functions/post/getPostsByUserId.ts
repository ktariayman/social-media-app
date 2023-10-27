import axios from "axios"

export const getSavedPostsByUserId = async (token: string) => {
 const { data } = await axios.get(
  `${process.env.REACT_APP_BACKEND_URL}/getPostsByUserId`,
  {
   headers: {
    Authorization: `Bearer ${token}`
   }
  }
 )
 return data
}

