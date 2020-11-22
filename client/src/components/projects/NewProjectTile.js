import React from "react";
import { FiPlus } from "react-icons/fi";
import "../../css/Project.css";
const NewProjectTile = () => {
  return (
    <div className="project-tile-container">
      <div className="project-tile-box">
        <div className="new-project-tile-icon-container">
          <FiPlus className="new-project-tile-icon" />
        </div>
      </div>
      <div className="project-tile-name">New Project</div>
    </div>
  );
};

export default NewProjectTile;
