
import axios from "axios";
import { LoginFormValues } from "../../ts/interface/user";

const login = async (values: LoginFormValues) => {
 try {
  const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
   email: values.email,
   password: values.password
  });
  return data;
 } catch (error: any) {
  return error.response.data.message;
 }
};
export { login }