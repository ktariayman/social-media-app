import { Link } from "react-router-dom";
export default function Friends({ friends }: any) {
  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Friends
        <div className="profile_header_link"><Link to={'/friends/all'}>See all friends</Link></div>
      </div>
      {friends && (
        <div className="profile_card_count">
          <i className="fa-solid fa-user-plus"></i>
          {friends.length === 0
            ? ""
            : friends.length === 1
              ? "1 Friend"
              : `${friends.length} Friends`}
        </div>
      )}
      <div className="profile_card_grid">
        {friends &&
          friends.slice(0, 9).map((friend: any, i: any) => (
            <Link
              to={`/profile/${friend.username}`}
              className="profile_photo_card"
              key={i}
            >
              <img src={friend.picture} alt="" />
              <span>
                {friend.first_name} {friend.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}
