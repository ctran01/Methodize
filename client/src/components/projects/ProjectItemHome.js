import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/Project.css";
import { AiOutlineEllipsis } from "react-icons/ai";
import { Menu, MenuItem } from "@material-ui/core";

const ProjectItemHome = ({ project }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //import component as body such as forms, details, etc
  // const body = (
  //   <div className="modal-container">
  //     {/* <h2 id="modal-title">Task Detail</h2>
  //     <p id="modal-description">
  //       Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
  //     </p> */}
  //     <TaskDetailsForm task={task} closeModal={closeModal} />
  //   </div>
  // );

  return (
    <Link
      className="project-tile--link"
      to={`/team/${project.team_id}/project/${project.id}/${project.name}`}
    >
      <div className="project-home-item" onClick={openModal}>
        <div className="project-home-item-inner-container">
          <div className="project-home-item-inner-left">
            <div className="project-home-item-icon-container">
              <span className={`dot-task-${project.id}`}></span>
            </div>
            <div className="project-home-item-name-container">
              <p style={{ fontSize: "15px", fontWeight: "500", margin: "0px" }}>
                {project.name}
              </p>
            </div>
          </div>
          <div
            className="project-home-item-more-menu"
            style={{ height: "100%" }}
            onClick={handleMenuClick}
          >
            <AiOutlineEllipsis style={{ fontSize: "24px" }} />
          </div>
          <Menu
            style={{}}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
          </Menu>
        </div>
      </div>
    </Link>
  );
};

export default ProjectItemHome;
