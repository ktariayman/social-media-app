import axios from "axios";

const sendResetPasswordCode = async (token: string) => {
 try {
  const { data } = await axios.post(
   `${process.env.REACT_APP_BACKEND_URL}/sendVerification`,
   {},
   {
    headers: {
     Authorization: `Bearer ${token}`
    }
   }
  );
  return data;
 } catch (error: any) {
  return error.response.data.message;
 }
};
export default sendResetPasswordCode


