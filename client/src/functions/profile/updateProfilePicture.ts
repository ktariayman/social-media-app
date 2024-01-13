import axios from "axios"

const updateProfilePictureService = async (url: string, token: string) => {
 try {
  await axios.put(
   `${process.env.REACT_APP_BACKEND_URL}/updateProfilePicture`,
   { url },
   {
    headers: {
     Authorization: `Bearer ${token}`
    }
   }
  )
  return 'ok'
 } catch (error: any) {
  return error.response.data.message

 }
}

export default updateProfilePictureService