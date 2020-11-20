import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Pages/Home";
import Tasks from "./Pages/Tasks";
import Project from "./Pages/Project";
import "../css/Navbar.css";
import LeftNavBar from "./NavigationBar/LeftNavBar";

import { Context as UserContext } from "../context/store/UserStore";
import { Context as TaskContext } from "../context/store/TaskStore";
import { Context as ProjectContext } from "../context/store/ProjectStore";
import { Context as TeamContext } from "../context/store/TeamStore";

import apiServer from "../config/apiServer";

const AuthRoutes = () => {
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const [taskState, taskdispatch] = useContext(TaskContext);
  const [userState, userdispatch] = useContext(UserContext);
  const [projectState, projectdispatch] = useContext(ProjectContext);
  const [teamState, teamdispatch] = useContext(TeamContext);

  //Maybe grab all information here and state goes down to child components?
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

  const getUserTeams = async () => {
    const id = localStorage.getItem("userId");
    const res = await apiServer.get(`/team/user/${id}`);
    await teamdispatch({ type: "get_user_teams", payload: res.data[0].Teams });
    // setTeams(res.data[0].Teams);
  };

  const getUserProjects = async () => {
    const id = localStorage.getItem("userId");
    const res = await apiServer.get(`/project/user/${id}`);
    await projectdispatch({ type: "get_user_projects", payload: res.data });
  };

  useEffect(() => {
    getUserInfo();
    getUserTasks();
    getUserTeams();
    getUserProjects();
  }, []);

  return (
    <div className="overlay">
      <BrowserRouter>
        <LeftNavBar showSidebar={showSidebar} sidebar={sidebar} />
        <div className="overlay-right-container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/tasks" component={Tasks} />
            <Route path="/project/:projectId/:projectName" component={Project} />
            <Route
              path="/*"
              render={() => {
                return <Redirect to="/" />;
              }}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default AuthRoutes;
