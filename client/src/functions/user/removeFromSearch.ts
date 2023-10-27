


import axios from "axios";

const removeFromSearch = async (
 searchUser: string, token: string,
) => {
 try {
  const { data } = await axios.put(
   `${process.env.REACT_APP_BACKEND_URL}/removeFromSearch`,
   { searchUser },

   {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   }
  );
  return data;
 } catch (error: any) {
  return error.response.data.message;
 }
};
export default removeFromSearch


