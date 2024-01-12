import Card from "../components/Card";
import { BeatLoader } from "react-spinners";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFriends } from "../../../hooks";
import { IUser } from "../../../ts/interface/user";

const FriendsSent = () => {
  const type = useParams()
  const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
  const { data, getData } = useFriends()
  return (
    <div className="friends_right_wrap">
      <div className="friends_left_header">
        <h3>Sent Requests : {data?.sentRequests?.length}</h3>
        {type === undefined && (
          <Link to="/friends/sent" className="see_link hover3">
            See all
          </Link>
        )}
      </div>
      <div className="flex_wrap">
        {!data.sentRequests ?
          <div>
            <BeatLoader color="#1876f2" size={10} />
          </div>
          :
          <>
            {data.sentRequests &&
              data.sentRequests.map((user: any) => (
                <Card
                  userr={user}
                  key={user._id}
                  type="sent"
                  getData={getData}
                />
              ))}
          </>
        }

      </div>
    </div>
  )
};

export default FriendsSent;
