import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Pages/Home";
import Tasks from "./Pages/Tasks";
import "../css/Navbar.css";
import LeftNavBar from "./NavigationBar/LeftNavBar";

import { Context as UserContext } from "../context/store/UserStore";
import { Context as TaskContext } from "../context/store/TaskStore";
import apiServer from "../config/apiServer";

const AuthRoutes = () => {
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const [taskState, taskdispatch] = useContext(TaskContext);
  const [userState, userdispatch] = useContext(UserContext);
  //Maybe grab information here and state goes down to child components?
  const getUserInfo = async () => {
    const id = localStorage.getItem("userId");
    const res = await apiServer.get(`/user/${id}`);
    // setName(res.data.name);
    await userdispatch({ type: "get_user_info", payload: res.data });
  };

  const getUserTasks = async () => {
    const id = localStorage.getItem("userId");
    const res = await apiServer.get(`/task/user/${id}`);
    await taskdispatch({ type: "get_user_tasks", payload: res.data });
  };

  useEffect(() => {
    getUserInfo();
    getUserTasks();
  }, []);
  return (
    <BrowserRouter>
      <div className="overlay">
        <LeftNavBar showSidebar={showSidebar} sidebar={sidebar} />
        <div className="overlay-right-container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/tasks" component={Tasks} />
            <Route
              path="/*"
              render={() => {
                return <Redirect to="/" />;
              }}
            />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AuthRoutes;
