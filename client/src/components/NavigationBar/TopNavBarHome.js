import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import "../../css/Navbar.css";
import { GrAddCircle } from "react-icons/gr";
import UserAvatar from "./UserAvatar";
import { Menu, MenuItem } from "@material-ui/core";
import Search from "../../assets/search";
import messageIcon from "../../assets/message.png";
import Alert from "../../assets/alert";
import ProjectForm from "../Forms/ProjectForm";
import TaskForm from "../Forms/AddTaskForm";
import apiServer from "../../config/apiServer";
import { Context as UserContext } from "../../context/store/UserStore";

const TopNavBarHome = () => {
  const { logout } = useContext(AuthContext);
  const [userState, userdispatch] = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEle, setAnchorEle] = useState(null);
  const [openProject, setOpenProject] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const userId = localStorage.getItem("userId");

  // useEffect(()=>{
  //   (async()=>{
  //     const user = await apiServer.get("/user")
  //   })();
  // },[])

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
      ></div>
      <div className="top-nav-bar-middle"></div>
      <div className="top-nav-bar-right" style={{}}>
        {/* <div style={{ display: "flex" }}>
          <input className="searchbar" placeholder={"Search"}></input>
        </div> */}
        {/* <div>
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
        </div> */}
        <div
          className="top-nav-icons"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div>
            <Alert />
          </div>
          <div>
            <Search />
          </div>

          <div>
            <img className="logo" style={{}} src={messageIcon} alt="logo" />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ padding: "0" }}>
            <UserAvatar id={localStorage.getItem("userId")} />
          </div>
          <div>
            <p style={{ fontWeight: 500 }}>{userState.user.name}</p>
          </div>
          <div
            onClick={handleProfClick}
            style={{ padding: "0", cursor: "pointer" }}
          >
            <i className="arrow"></i>
          </div>
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

export default TopNavBarHome;
