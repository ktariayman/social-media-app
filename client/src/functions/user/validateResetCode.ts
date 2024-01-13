
import axios from "axios";

export const validateResetCode = async (email: string, code: string): Promise<any> => {
 try {
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/validateResetCode`, {
   email,
   code
  });
 } catch (error: any) {
  return error.response.data.message;
 }
};
