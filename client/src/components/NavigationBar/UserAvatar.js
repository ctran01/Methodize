import React from "react";
import "../../css/Navbar.css";
const UserAvatar = ({ user }) => {
  return (
    <div className="user-avatar">
      {(user.name[0] + user.name[1]).toUpperCase()}
    </div>
  );
};

export default UserAvatar;
