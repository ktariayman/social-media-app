interface LoginFormValues {
  email: string;
  password: string;
}
interface RegisterFormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  bYear: number;
  bMonth: number;
  bDay: number;
  gender: string;
}
export type { LoginFormValues, RegisterFormValues };
