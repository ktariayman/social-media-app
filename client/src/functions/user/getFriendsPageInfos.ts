

import axios from "axios";

const getFriendsPageInfos = async (token: string) => {
 try {
  const { data } = await axios.get(
   `${process.env.REACT_APP_BACKEND_URL}/getFriendsPageInfos`,

   {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   }
  );
  return { status: "ok", data };
 } catch (error: any) {
  return error.response.data.message;
 }
};
export default getFriendsPageInfos