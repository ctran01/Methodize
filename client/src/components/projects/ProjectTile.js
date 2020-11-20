import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../css/Project.css";
import { AiOutlineProject } from "react-icons/ai";
const ProjectTile = ({ project }) => {
  return (
    <Link to={`/project/${project.id}/${project.name}`}>
      <div className="project-tile-container">
        <div className="project-tile-box">
          <div className="project-tile-icon">
            <AiOutlineProject style={{ fontSize: "30px" }} />
          </div>
        </div>
        <div className="project-tile-name">{project.name}</div>
      </div>
    </Link>
  );
};

export default ProjectTile;
