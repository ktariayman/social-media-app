


import axios from "axios";

const searchUsers = async (
 searchTerm: string, token: string,
) => {
 try {
  const { data } = await axios.post(
   `${process.env.REACT_APP_BACKEND_URL}/searchUsers/${searchTerm}`,
   {},

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
export default searchUsers


