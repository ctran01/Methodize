import React, { useContext } from "react";
import "../../css/Project.css";
const ProjectTile = ({ project }) => {
  return (
    <div className="project-tile-container">
      <div className="project-tile-box">
        <div className="project-tile-icon"></div>
      </div>
      <div className="project-tile-name">{project.name}</div>
    </div>
  );
};

export default ProjectTile;
