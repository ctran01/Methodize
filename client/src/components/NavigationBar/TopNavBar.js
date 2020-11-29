import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import "../../css/Navbar.css";
import { GrAddCircle } from "react-icons/gr";
import { Context as UserContext } from "../../context/store/UserStore";
import UserAvatar from "./UserAvatar";
import { Modal, Menu, MenuItem } from "@material-ui/core";
import ProjectForm from "../Forms/ProjectForm";
import TaskForm from "../Forms/AddTaskForm";

const TopNavBar = ({ name }) => {
  const { logout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showNewMenu, setNewMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEle, setAnchorEle] = useState(null);
  const [openProject, setOpenProject] = useState(false);
  const [openTask, setOpenTask] = useState(false);

  const clickOpenTask = () => {
    setOpenTask(true);
    handleNewClose();
  };

  const clickCloseTask = () => {
    setOpenTask(false);
  };

  const clickOpenProject = () => {
    setOpenProject(true);
    handleNewClose();
  };
  const clickCloseProject = () => {
    setOpenProject(false);
  };

  const handleNewClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNewClose = () => {
    setAnchorEl(null);
  };

  const handleProfClick = (event) => {
    setAnchorEle(event.currentTarget);
  };
  const handleProfClose = () => {
    setAnchorEle(null);
  };

  return (
    <div className="top-nav-bar-container">
      <div className="top-nav-bar-left">
        <h2>{name}</h2>
      </div>
      <div className="top-nav-bar-middle"></div>
      <div className="top-nav-bar-right" style={{}}>
        <div style={{ display: "flex" }}>
          <input className="searchbar" placeholder={"Search"}></input>
        </div>
        <div>
          <GrAddCircle onClick={handleNewClick} className="top-nav-bar--icon" />
          <Menu
            style={{ marginTop: "40px" }}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleNewClose}
          >
            <MenuItem onClick={clickOpenTask}>Add Task</MenuItem>
            <TaskForm
              handleNewClose={handleNewClose}
              clickClose={clickCloseTask}
              open={openTask}
            ></TaskForm>
            <MenuItem onClick={clickOpenProject}>Add Project</MenuItem>
            <ProjectForm
              handleNewClose={handleNewClose}
              clickClose={clickCloseProject}
              open={openProject}
            />
          </Menu>
          {/* {newMenu ? (
            <div className="drop-down-new-menu">
              <button
                className="new-task--button"
                style={{ padding: "5px 0", borderRadius: "5px 5px 0 0" }}
              >
                New Task
              </button>
              <button
                className="new-project--button"
                style={{ borderRadius: "0 0 5px 5px" }}
              >
                New Project
              </button>
              <button onClick={handleProjectForm}>Open Form</button>
            </div>
          ) : null} */}
        </div>
        {/* <div onClick={handleMenu} className="top-nav-bar-user-icon">
          <UserAvatar />
          {showMenu ? (
            <div className="drop-down-menu">
              <button
                className="logout--button"
                style={{ borderRadius: "5px" }}
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : null}
        </div> */}
        <div onClick={handleProfClick}>
          <UserAvatar id={localStorage.getItem("userId")} />
        </div>

        <Menu
          style={{ marginTop: "40px" }}
          anchorEl={anchorEle}
          keepMounted
          open={Boolean(anchorEle)}
          onClose={handleProfClose}
        >
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default TopNavBar;
