import axios from "axios";

const findUserByEmail = async (email: string) => {
 try {
  const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/findUserByEmail`, {
   email
  });
  return data
 } catch (error: any) {
  return error.response.data.message;
 }
};
export default findUserByEmail



