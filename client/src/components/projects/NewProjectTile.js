import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import { FiPlus } from "react-icons/fi";
import "../../css/Project.css";
import ProjectForm from "../Forms/ProjectForm";
const NewProjectTile = ({ showSideProjectForm }) => {
  const [open, setOpen] = useState(false);
  // const openModal = () => {
  //   setOpen(true);
  // };

  // const closeModal = () => {
  //   setOpen(false);
  // };
  // const modalBody = (
  //   <div className="modal-container">
  //     <ProjectForm clickClose={closeModal} open={open}></ProjectForm>
  //   </div>
  // );
  return (
    <div className="project-tile-container" onClick={showSideProjectForm}>
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
