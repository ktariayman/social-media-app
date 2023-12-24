import axios from "axios";
import { RegisterFormValues } from "../../ts/interface/user";

const register = async (values: RegisterFormValues) => {
 try {
  const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, values);
  return data;
 } catch (error: any) {
  return error.response.data.message;
 }
};
export default register






