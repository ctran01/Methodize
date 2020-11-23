import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Context as UserContext } from "../../context/store/UserStore";
import { Context as TaskContext } from "../../context/store/TaskStore";
import "../../css/Navbar.css";
import { GrAddCircle } from "react-icons/gr";
import UserAvatar from "./UserAvatar";

const TopNavBarTask = () => {
  const { setAuth, setEmail, setUserId, logout } = useContext(AuthContext);
  const [userState] = useContext(UserContext);
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
          <GrAddCircle className="top-nav-bar--icon" />
        </div>
        <div className="top-nav-bar-user-icon">
          <UserAvatar />
        </div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default TopNavBarTask;
