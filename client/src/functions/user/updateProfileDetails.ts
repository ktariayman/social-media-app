
import axios from "axios";

const updateProfileDetails = async (token: string, values: any) => {
 try {
  const { data } = await axios.put(
   `${process.env.REACT_APP_BACKEND_URL}/updateDetails`,
   {
    values,
   },
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
export default updateProfileDetails


