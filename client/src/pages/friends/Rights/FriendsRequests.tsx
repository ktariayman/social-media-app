import { BeatLoader } from "react-spinners";
import Card from "../components/Card";
import { Link, useParams } from "react-router-dom";
import { useFriends } from '../../../hooks';
import { useSelector } from "react-redux";
import { IUser } from "../../../ts/interface/user";

const FriendsRequests = () => {
  const type = useParams()
  const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
  const { data, getData } = useFriends()

  return (
    <div className="friends_right_wrap">
      <div className="friends_left_header">
        <h3>Friend Requests : {data?.requests?.length} </h3>
        {type === undefined && (
          <Link to="/friends/requests" className="see_link hover3">
            See all
          </Link>
        )}
      </div>
      <div className="flex_wrap">
        {!data.requests ?
          <div>
            <BeatLoader color="#1876f2" size={10} />
          </div>
          :
          <>
            {data.requests &&
              data.requests.map((user: any) => (
                <>
                  <Card
                    userr={user}
                    key={user._id}
                    type="request"
                    getData={getData}
                  />
                </>
              ))}
          </>
        }

      </div>
    </div>
  )
};

export default FriendsRequests;
