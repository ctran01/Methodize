import React from "react";
import UserAvatar from "../NavigationBar/UserAvatar";

const TeamMemberIcon = ({ user }) => {
  return (
    <div className="team-member-container">
      <div className="team-member-icon">
        <UserAvatar id={user.id} />
      </div>
      <div className="team-member-name-container">
        <div className="team-member-name">{user.name}</div>
        <div className="team-member-email">{user.email}</div>
      </div>
    </div>
  );
};

export default TeamMemberIcon;
