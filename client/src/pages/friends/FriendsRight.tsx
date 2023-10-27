import React from "react";
import { Link, useParams } from "react-router-dom";
import Card from "./Card";
import { BeatLoader } from "react-spinners";
import PplYouMayKnow from "../profile/PeoplesYouMayKnow";
import { useSelector } from "react-redux";

function FriendsRight({ data, getData }: any) {
  const { type } = useParams();
  return (

    <div className="friends_right">
      {(type === undefined || type === "requests") && (
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
      )}
      {(type === undefined || type === "sent") && (
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
      )}
      {(type === undefined || type === "all") && (
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
      )}

    </div>
  );
}

export default FriendsRight;
