import { LoginFormValues, RegisterFormValues } from '../ts/interface/user';

const RegisterFormData: RegisterFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  bYear: new Date().getFullYear(),
  bMonth: new Date().getMonth() + 1,
  bDay: new Date().getDate(),
  gender: "",
};

const loginFormData: LoginFormValues = {
  email: '',
  password: ''
};
export { RegisterFormData, loginFormData };
