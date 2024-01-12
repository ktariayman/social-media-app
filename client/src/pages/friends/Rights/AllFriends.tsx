import Card from "../components/Card";
import { BeatLoader } from "react-spinners";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFriends } from "../../../hooks";
import { IUser } from "../../../ts/interface/user";

const AllFriends = () => {
  const type = useParams()
  const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
  const { data, getData } = useFriends()
  return (
    <div className="friends_right_wrap">
      <div className="friends_left_header">
        <h3>Friends : {data?.friends?.length!}</h3>
        {type === undefined && (
          <Link to="/friends/all" className="see_link hover3">
            See all
          </Link>
        )}
      </div>
      <div className="flex_wrap">
        {!data.friends ?
          <div>
            <BeatLoader color="#1876f2" size={10} />
          </div>
          :
          <>
            {data.friends &&
              data.friends.map((user: any) => (
                <Card
                  userr={user}
                  key={user._id}
                  type="friends"
                  getData={getData}
                />
              ))}
          </>
        }
      </div>
    </div>
  )
};

export default AllFriends;
