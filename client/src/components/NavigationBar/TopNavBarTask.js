import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Context as UserContext } from "../../context/store/UserStore";
import { Context as TaskContext } from "../../context/store/TaskStore";
import "../../css/Navbar.css";
import { CgProfile } from "react-icons/cg";
import { GrAddCircle } from "react-icons/gr";
import apiServer from "../../config/apiServer";
const TopNavBarTask = () => {
  const { setAuth, setEmail, setUserId, logout } = useContext(AuthContext);
  const [userState, userdispatch] = useContext(UserContext);
  const { name } = userState.user;
  const [taskState, taskdispatch] = useContext(TaskContext);
  const numTask = taskState.tasks.filter((task) => task.completed === true);

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
      <div className="top-nav-bar-right">
        <div>Search</div>
        <div>
          <GrAddCircle style={{ fontSize: "24px" }} />
        </div>
        <div>
          <CgProfile style={{ fontSize: "24px" }} />
        </div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default TopNavBarTask;
