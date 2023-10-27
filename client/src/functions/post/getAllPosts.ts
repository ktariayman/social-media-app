import axios from "axios"

export const getAllPostsService = async (token: string) => {
   const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
      {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }
   )
   return data
}

