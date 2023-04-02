import React from 'react';
import './style.css';
import { useField } from 'formik';
function InputLogin({ placeholder, ...props }: any) {
  const [field, meta] = useField<any>(props);

  return (
    <div className='input_wrap'>
      <input type={props.type} placeholder={placeholder} {...field} {...props} />
    </div>
  );
}
export default InputLogin;
