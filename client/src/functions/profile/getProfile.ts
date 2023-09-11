import axios from "axios"

export const getProfile = async (token: string, userName: string) => {
 const { data } = await axios.get(
  `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
  {
   headers: {
    Authorization: `Bearer ${token}`
   }
  }
 )
 return data
}
