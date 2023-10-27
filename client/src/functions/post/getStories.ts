import axios from "axios"

export const getStories = async (token: string) => {
 const { data } = await axios.get(
  `${process.env.REACT_APP_BACKEND_URL}/getStories`,
  {
   headers: {
    Authorization: `Bearer ${token}`
   }
  }
 )
 return data
}

