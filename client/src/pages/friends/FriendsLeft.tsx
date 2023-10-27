import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
function FriendsLeft() {

  const { type } = useParams();
  const [isBirthDayPage, isSuggestionPage] = [window.location.pathname === '/friends/birthdays', window.location.pathname === '/friends/suggestions']
  const links = [
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
      {/* <div className="friends_left_wrap">
        <Link
          to="/friends"
          className={`mmenu_item hover3 ${type === undefined && !isSuggestionPage && !isBirthDayPage && "active_friends"
            }`}
        >
          <div className="small_circle">
            <i className="friends_home_icon "></i>
          </div>
          <span>Home</span>
          <div className="rArrow">
            <i className="right_icon"></i>
          </div>
        </Link>
        <Link
          to="/friends/requests"
          className={`mmenu_item hover3 ${type === "requests" && "active_friends"
            }`}
        >
          <div className="small_circle">
            <i className="friends_requests_icon"></i>
          </div>
          <span>Friend Requests</span>
          <div className="rArrow">
            <i className="right_icon"></i>
          </div>
        </Link>
        <Link
          to="/friends/sent"
          className={`mmenu_item hover3 ${type === "sent" && "active_friends"
            }`}
        >
          <div className="small_circle">
            <i className="friends_requests_icon"></i>
          </div>
          <span>Sent Requests</span>
          <div className="rArrow">
            <i className="right_icon"></i>
          </div>
        </Link>

        <Link
          to="/friends/all"
          className={`mmenu_item hover3 ${type === "all" && "active_friends"
            }`}
        >
          <div className="small_circle">
            <i className="all_friends_icon"></i>
          </div>
          <span>All Friends</span>
          <div className="rArrow">
            <i className="right_icon"></i>
          </div>
        </Link>
        <Link
          to='/friends/birthdays'
          className={`mmenu_item hover3 ${isBirthDayPage && "active_friends"}`}
        >
          <div className="small_circle">
            <i className="birthdays_icon"></i>
          </div>
          <span>Birthdays</span>
          <div className="rArrow">
            <i className="right_icon"></i>
          </div>
        </Link>
        <Link
          to='/friends/suggestions'
          className={`mmenu_item hover3 ${isSuggestionPage && "active_friends"}`}
        >
          <div className="small_circle">
            <i className="friends_suggestions_icon"></i>
          </div>
          <span>Suggestions</span>
          <div className="rArrow">
            <i className="right_icon"></i>
          </div>
        </Link>
      </div> */}
      <div className="friends_left_wrap">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className={`mmenu_item hover3 ${((type === undefined && !isSuggestionPage && !isBirthDayPage && link.to === '/friends') ||
              (type === link.to.split('/')[2] && type !== undefined) ||
              (isSuggestionPage && link.to === '/friends/suggestions') ||
              (isBirthDayPage && link.to === '/friends/birthdays')) &&
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
        ))}
      </div>
    </div>
  );
}

export default FriendsLeft;
