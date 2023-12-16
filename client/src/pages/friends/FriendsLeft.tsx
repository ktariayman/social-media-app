import React from "react";
import { Link, useParams } from "react-router-dom";
function FriendsLeft() {
  const { type } = useParams();
  const links: {
    to: string;
    text: string;
    iconClass: string;
  }[] = [
      { to: '/friends', text: 'Home', iconClass: 'friends_home_icon' },
      { to: '/friends/requests', text: 'Friend Requests', iconClass: 'friends_requests_icon' },
      { to: '/friends/sent', text: 'Sent Requests', iconClass: 'friends_requests_icon' },
      { to: '/friends/all', text: 'All Friends', iconClass: 'all_friends_icon' },
      { to: '/friends/birthdays', text: 'Birthdays', iconClass: 'birthdays_icon' },
      { to: '/friends/suggestions', text: 'Suggestions', iconClass: 'friends_suggestions_icon' }
    ];
  return (
    <div className="friends_left">
      <div className="friends_left_header">
        <h3>Friends</h3>
        <div className="small_circle">
          <i className="settings_filled_icon"></i>
        </div>
      </div>
      <div className="friends_left_wrap">
        {links.map((link, index) => (
          <LinkItem key={index} link={link} type={type!} />
        ))}
      </div>
    </div>
  );
}

export default FriendsLeft;


type Props = {
  link: {
    to: string;
    text: string;
    iconClass: string;
  },
  key: number
  type: string
}
const LinkItem = ({ key, link, type }: Props) => {
  return (
    <Link
      key={key}
      to={link.to}
      className={`mmenu_item hover3 ${((type === undefined && link.to === '/friends') ||
        (type === link.to.split('/')[2] && type !== undefined)) &&
        'active_friends'}`}
    >
      <div className="small_circle">
        <i className={link.iconClass}></i>
      </div>
      <span>{link.text}</span>
      <div className="rArrow">
        <i className="right_icon"></i>
      </div>
    </Link>
  )
}