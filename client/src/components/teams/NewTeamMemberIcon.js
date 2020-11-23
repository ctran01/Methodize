import React from "react";
import "../../css/Navbar.css";
import { FiPlus } from "react-icons/fi";

const NewTeamMemberIcon = () => {
  return (
    <div className="team-member-container" style={{ cursor: "pointer" }}>
      <div className="team-member-icon">
        <div className="new-user-avatar">
          <FiPlus className="new-user-avatar--icon" />
        </div>
      </div>
      <div className="team-member-name-container">
        <div className="new-team-member-name">Add Member</div>
      </div>
    </div>
  );
};

export default NewTeamMemberIcon;
