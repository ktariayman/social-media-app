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

interface IStory {
  profile_picture: string;
  profile_name: string;
  image: string;
  username?: string
  createdAt?: string
  text?: string
}

interface ILeftItem {
  text?: string
  img?: string
  notification?: string
  to?: string
}
export type { LoginFormValues, RegisterFormValues, IStory, ILeftItem };


export interface IUser {
  first_name: string;
  id: string;
  last_name: string;
  picture: string;
  token: string;
  username: string;
  verified: boolean;
  email?: string;
}