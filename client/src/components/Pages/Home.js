import React, { useContext } from "react";

import { Context as UserContext } from "../../context/store/UserStore";
import { Context as TaskContext } from "../../context/store/TaskStore";
import { Context as ProjectContext } from "../../context/store/ProjectStore";
import TaskItem from "../tasks/TaskItem";
import TopNavBarHome from "../NavigationBar/TopNavBarHome";
import ProjectTile from "../projects/ProjectTile";
import NewProjectTile from "../projects/NewProjectTile";
import homeImage from "../../assets/codeVersion.png";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [userState] = useContext(UserContext);
  const [taskState] = useContext(TaskContext);
  const [projectState] = useContext(ProjectContext);

  const uncompletedTasklist = taskState.tasks.filter((task) => {
    return !task.completed;
  });
  const sortedTaskList = uncompletedTasklist.sort(function (a, b) {
    return new Date(b.due_date) - new Date(a.due_date);
  });

  const upcomingTasklist = sortedTaskList
    .slice(sortedTaskList.length - 3)
    .reverse();
  const taskList = upcomingTasklist.map((task, i) => {
    return !task.completed && <TaskItem task={task} key={i} />;
  });

  const projectTiles = projectState.projects.map((project, i) => {
    return <ProjectTile project={project} key={i} id={project.id} />;
  });

  return (
    <>
      <TopNavBarHome />
      <section style={{ margin: "20px 120px", height: "100%" }}>
        <div className="home-container">
          <div className="home-welcome-header">
            <img src={homeImage} alt="home" style={{ width: "400px" }}></img>
            <div>
              <h2 className="home-welcome-message">
                Greetings, {userState.user.name}!
              </h2>
              <p>
                This is your homepage where you can see all the projects are you
                currently working on as well as any tasks due soon!{" "}
              </p>
            </div>
          </div>
          <div className="home-tasks-container">
            <div className="home-tasks-header">
              <div>
                <h2 style={{ color: "#151b26", fontWeight: 500 }}>
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
            </div>
          </div>
          <div className="home-projects-container">
            <div className="home-projects-header">
              <h2 style={{ color: "#151b26", fontWeight: 500 }}>Projects</h2>
            </div>
            <div className="home-projects--list">
              {/* call get all projects for specific user route */}
              {projectTiles}
              <div>
                <NewProjectTile />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
