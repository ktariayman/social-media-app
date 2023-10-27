import axios from "axios";

const addToSearchHistory = async (searchUser: string, token: string) => {
 try {
  const { data } = await axios.put(
   `${process.env.REACT_APP_BACKEND_URL}/addToSearchHistory`,
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
export default addToSearchHistory


