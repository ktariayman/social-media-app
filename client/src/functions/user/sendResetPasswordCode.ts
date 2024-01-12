import axios from "axios";

const sendVerification = async (email: string) => {
 try {
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`, { email });
 } catch (error: any) {
  return error.response.data.message;
 }
};
export default sendVerification


