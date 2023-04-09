import * as Yup from 'yup';
const registerValidation = Yup.object({
  first_name: Yup.string()
    .required("What's your First name ?")
    .min(2, 'Fisrt name must be between 2 and 16 characters.')
    .max(16, 'Fisrt name must be between 2 and 16 characters.')
    .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.'),
  last_name: Yup.string()
    .required("What's your Last name ?")
    .min(2, 'Last name must be between 2 and 16 characters.')
    .max(16, 'Last name must be between 2 and 16 characters.')
    .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.'),
  email: Yup.string()
    .required("You'll need this when you log in and if you ever need to reset your password.")
    .email('Enter a valid email address.'),
  password: Yup.string()
    .required(
      'Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &).'
    )
    .min(6, 'Password must be atleast 6 characters.')
    .max(36, "Password can't be more than 36 characters")
});

const loginValidation = Yup.object({
  password: Yup.string().required('Password is required'),
  email: Yup.string().required('email is required').email()
});

const validatePassword = Yup.object({
  password: Yup.string()
    .required(
      'Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &).'
    )
    .min(6, 'Password must be atleast 6 characters.')
    .max(36, "Password can't be more than 36 characters"),

  conf_password: Yup.string()
    .required('Confirm your password.')
    .oneOf([Yup.ref('password')], 'Passwords must match.')
});

const validateEmail = Yup.object({
  email: Yup.string()
    .required('Email address ir required.')
    .email('Must be a valid email address.')
    .max(50, "Email address can't be more than 50 characters.")
});
export { registerValidation, loginValidation, validatePassword, validateEmail };
