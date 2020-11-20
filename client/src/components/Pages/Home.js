import React, { useContext, useEffect, useState } from "react";
import TaskItem from "../tasks/TaskItem";
import TopNavBarHome from "../NavigationBar/TopNavBarHome";
import { FiPlus } from "react-icons/fi";

import { Context as UserContext } from "../../context/store/UserStore";
import { Context as TaskContext } from "../../context/store/TaskStore";
import { Context as ProjectContext } from "../../context/store/ProjectStore";
import ProjectTile from "../projects/ProjectTile";

const HomePage = () => {
  const [getUserInfo] = useContext(UserContext);
  const [taskState] = useContext(TaskContext);
  const [projectState] = useContext(ProjectContext);
  const taskList = taskState.tasks.map((task, i) => {
    return !task.completed && <TaskItem task={task} key={i} />;
  });

  const projectTiles = projectState.projects.map((project, i) => {
    return <ProjectTile project={project} key={i} />;
  });

  return (
    <>
      <TopNavBarHome />
      <section style={{ margin: "20px 120px" }}>
        <div
          className="home-container"
          style={{ width: "900px", margin: "0 auto" }}
        >
          {/* <div className="home-welcome-header">Welcome [name]!</div> */}
          <div className="home-tasks-container">
            <div className="home-tasks-header">
              <div>
                <h2 style={{ color: "#151b26", fontWeight: 500 }}>
                  Tasks Due Soon
                </h2>
              </div>
              <div>
                <p>See all my tasks</p>
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
              <div className="project-tile-container">
                <div className="project-tile-box">
                  <div className="project-tile-icon">
                    <FiPlus style={{ fontSize: "40px" }} />
                  </div>
                </div>
                <div className="project-tile-name">New Project</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
