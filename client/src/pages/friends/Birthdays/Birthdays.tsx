import './style.css'
import { Header } from "../../../components";
import FriendsLeft from "../FriendsLeft";
import { useEffect, useState } from 'react';
import getFriendBirthdays from '../../../functions/user/getFriendBirthdays';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from "react-spinners";
import BirthdayItem from './BirthdayItem';

function Birthdays() {
  const [birthdays, setBirthdays] = useState<any>([])
  const { user } = useSelector((state: any) => ({ ...state }));
  useEffect(() => {
    getFriendsBirthdays()
  }, [])
  const getFriendsBirthdays = async () => {
    const data = await getFriendBirthdays(user.token)
    setBirthdays(data);
  }
  return (
    <>
      <Header page="friends" />
      <div className="friends">
        <FriendsLeft />
        <div className='birthdays_right'>
          {birthdays.length === 0 ?
            <div>
              <BeatLoader color="#1876f2" size={10} />
            </div>
            :
            <>
              {birthdays.todayBirthday?.length !== 0 && <h1>  today Birthday   </h1>}

              {birthdays.todayBirthday?.map((user: any, k: any) => {
                return <BirthdayItem user={user} />
              })}
              {birthdays.recentBirthday?.length !== 0 && <h1>  recent Birthday   </h1>}

              {birthdays.recentBirthday?.map((user: any, k: any) => {
                return <BirthdayItem user={user} />
              })}


              {birthdays.comingBirthday?.length !== 0 && <h1>  Comming Birthday   </h1>}
              {birthdays.comingBirthday?.map((user: any, k: any) => {
                return <BirthdayItem user={user} />

              })}
            </>

          }
        </div>
      </div >
    </>
  );
}

export default Birthdays;
