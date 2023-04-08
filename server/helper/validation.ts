import { User } from '../model';
const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};
const validateLength = (text: string, min: number, max: number) => {
  if (text.length > max || text.length < min) {
    return false;
  }
  return true;
};
const validateUsername = async (username: string) => {
  let a = false;

  do {
    let UserWithUserNameExist = await User.findOne({ username });
    if (UserWithUserNameExist) {
      //change username
      username += (+new Date() * Math.random()).toString().substring(0, 1);
      a = true;
    } else {
      a = false;
    }
  } while (a);
  return username;
};

export { validateUsername, validateLength, validateEmail };
