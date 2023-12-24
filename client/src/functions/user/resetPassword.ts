import axios from "axios";

const resetPassword = async (email: string, password: string) => {
 try {
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/resetPassword`, {
   email,
   password
  });
 } catch (error: any) {
  return error.response.data.message;
 }
};
export default resetPassword




