import axios from "axios";

const changePassword = async (email: string, oldPassword: string, password: string, token: string) => {
 try {
  await axios.post(
   `${process.env.REACT_APP_BACKEND_URL}/changePassword`,
   {
    email,
    oldPassword,
    newPassword: password
   },
   {
    headers: {
     Authorization: `Bearer ${token}`
    }
   }
  );
 } catch (error: any) {
  return error.response.data.message;
 }
};
export default changePassword



