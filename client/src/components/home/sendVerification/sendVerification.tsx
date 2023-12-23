import { useState } from 'react';
import './style.css';
import axios from 'axios';
import { IUser } from '../../../ts/interface/user';

function SendVerification({ user }: { user: IUser }) {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const sendVerificationLink = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendVerification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      setSuccess(data.message);
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className='send_verification'>
      <span>
        Your account is not verified,verify your account before it gets deleted after a month from
        creating.
      </span>
      <a
        onClick={() => {
          sendVerificationLink();
        }}
      >
        click here to resend verification link
      </a>
      {success && <div className='success_text'>{success}</div>}
      {error && <div className='error_text'>{error}</div>}
    </div>
  );
}
export default SendVerification;
