import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Context as UserContext } from "../../context/store/UserStore";
import { Context as TaskContext } from "../../context/store/TaskStore";
import "../../css/Navbar.css";
import { GrAddCircle } from "react-icons/gr";
import UserAvatar from "./UserAvatar";
import { Menu, MenuItem } from "@material-ui/core";
import ProjectForm from "../Forms/ProjectForm";
import TaskForm from "../Forms/AddTaskForm";

const TopNavBarTask = () => {
  const { logout } = useContext(AuthContext);
  const [userState] = useContext(UserContext);
  const { name } = userState.user;
  const [taskState, taskdispatch] = useContext(TaskContext);
  const numTask = taskState.tasks.filter((task) => task.completed === true);

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
    <div className="top-nav-bar-container" style={{}}>
      <div
        className="top-nav-bar-left"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div style={{ fontSize: "20px" }}>{name}'s Tasks</div>
        <p style={{}}>{numTask.length} completed tasks</p>
      </div>
      <div className="top-nav-bar-middle"></div>
      <div className="top-nav-bar-right" style={{}}>
        {/* <div style={{ display: "flex" }}>
          <input className="searchbar" placeholder={"Search"}></input>
        </div> */}
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
            {/* <Modal open={openProject} onClose={clickCloseProject}>
              {projectBody}
            </Modal> */}
          </Menu>
        </div>

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

export default TopNavBarTask;
