import React, { useContext, useState } from "react";

import { Context as UserContext } from "../../context/store/UserStore";
import { Context as TaskContext } from "../../context/store/TaskStore";
import { Context as ProjectContext } from "../../context/store/ProjectStore";
import TaskItemHome from "../tasks/TaskItemHome";
import TopNavBarHome from "../NavigationBar/TopNavBarHome";
import ProjectTile from "../projects/ProjectTile";
import NewProjectTile from "../projects/NewProjectTile";
import Add from "../../assets/Add";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import AddProjectPopOut from "../PopOutMenu/AddProjectPopOut";
import AddTaskPopOutTaskPage from "../PopOutMenu/AddTaskPopOutTaskPage";
import PopOutTaskDetailsHome from "../PopOutMenu/PopOutTaskDetailsHome";

const HomePage = () => {
  // debugger;
  const [userState] = useContext(UserContext);
  const [taskState] = useContext(TaskContext);
  const [projectState] = useContext(ProjectContext);
  // const [teamProjects,setTeamProjects] = useState();
  const [sideTaskForm, setSideTaskForm] = useState(false);
  const [sideProjectForm, setSideProjectForm] = useState(false);
  const [sideTaskDetails, setSideTaskDetails] = useState(false);
  const showSideTaskForm = () => {
    setSideTaskDetails(false);
    setSideProjectForm(false);
    setSideTaskForm(!sideTaskForm);
  };

  const showSideProjectForm = () => {
    setSideTaskDetails(false);
    setSideTaskForm(false);
    setSideProjectForm(!sideProjectForm);
  };

  const showSideTaskDetails = () => {
    setSideTaskForm(false);
    setSideProjectForm(false);
    setSideTaskDetails(!sideTaskDetails);
  };

  const uncompletedTasklist = taskState.tasks.filter(
    (task) => task.completed === false
  );

  const sortedTaskList = uncompletedTasklist.sort(function (a, b) {
    return new Date(b.due_date) - new Date(a.due_date);
  });

  const upcomingTasklist = sortedTaskList.slice(0, 9);
  // const upcomingTasklist = sortedTaskList
  //   .slice(sortedTaskList.length - 4)
  //   .reverse();

  const taskList = upcomingTasklist.map((task, i) => {
    return (
      !task.completed && (
        <TaskItemHome
          task={task}
          key={i}
          showSideTaskDetails={showSideTaskDetails}
          sideTaskDetails={sideTaskDetails}
        />
      )
    );
  });

  const projectLists = projectState.projects.slice(0, 5);

  const projectTiles = projectLists.map((project, i) => {
    // return <ProjectItemHome project={project} key={i} id={project.id} />;
    return <ProjectTile project={project} key={i} id={project.id} />;
  });

  return (
    <>
      <TopNavBarHome />
      <div className="home-container">
        <div className="home-main-container">
          <div
            className="home-main-content-container"
            style={{ display: "flex" }}
          >
            <div
              className="home-inner-container"
              style={{
                background: "transparent",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
              }}
            >
              <div className="home-welcome-header">
                <p className="home-welcome-message">
                  Hi, {userState.user.name}!
                </p>
                <p
                  style={{ display: "flex", margin: "0", alignSelf: "center" }}
                >
                  Welcome to your dashboard.
                </p>
              </div>
              <div
                className="home-task-project-container"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  className={
                    upcomingTasklist.length < 5
                      ? "home-tasks-container--smaller"
                      : sideTaskForm || sideProjectForm || sideTaskDetails
                      ? "home-tasks-container--small"
                      : "home-tasks-container"
                  }
                >
                  <div className="home-tasks-header">
                    <div>
                      <h2
                        style={{
                          color: "#151b26",
                          fontWeight: 500,
                          fontSize: "20px",
                        }}
                      >
                        Tasks Due Soon
                      </h2>
                    </div>
                    <div>
                      <Link
                        to="/tasks"
                        style={{ textDecoration: "none", color: "blue" }}
                      >
                        <p style={{ fontSize: "14px" }}>See all my tasks</p>
                      </Link>
                    </div>
                  </div>
                  <div className="home-tasks--list">
                    {/* call get all tasks for specific user route */}
                    {taskList}
                    <div
                      className="new-home-item-container"
                      onClick={showSideTaskForm}
                    >
                      <div className="new-home-icon-container">
                        <Add className="new-home-item-icon" />
                      </div>
                      <div className="new-home-item-name">Create Task</div>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    upcomingTasklist.length < 5
                      ? "home-projects-container--smaller"
                      : sideTaskForm || sideProjectForm || sideTaskDetails
                      ? "home-projects-container--small"
                      : "home-projects-container"
                  }
                >
                  <div className="home-projects-header">
                    <div>
                      <h2
                        style={{
                          color: "#151b26",
                          fontWeight: 500,
                          fontSize: "20px",
                        }}
                      >
                        Projects
                      </h2>
                    </div>
                    {/* <div>
                  <Link
                    to="/projects"
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    <p style={{ fontSize: "14px" }}>See all my projects</p>
                  </Link>
                </div> */}
                  </div>
                  <div className="home-projects--list">
                    {/* call get all projects for specific user route */}
                    {projectTiles}
                    <div
                      // className="new-home-item-container"
                      onClick={showSideProjectForm}
                      style={{ height: "60%" }}
                    >
                      {/* <div className="new-home-icon-container">
                    <Add className="new-home-item-icon" />
                  </div>
                  <div className="new-home-item-name">Create Project</div> */}
                      <NewProjectTile />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {sideTaskForm ? (
              <AddTaskPopOutTaskPage
                showSideTaskForm={showSideTaskForm}
                title={"Add a Task"}
              />
            ) : null}
            {sideProjectForm ? (
              <AddProjectPopOut
                showSideProjectForm={showSideProjectForm}
                // setTeamProjects={setTeamProjects}
                title={"Add Project"}
              />
            ) : null}
            {sideTaskDetails && taskState.selectedTask ? (
              <PopOutTaskDetailsHome
                showSideTaskDetails={showSideTaskDetails}
                sideTaskDetails={sideTaskDetails}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
