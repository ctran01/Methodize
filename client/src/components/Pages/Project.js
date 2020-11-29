import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";
import TopNavBar from "../NavigationBar/TopNavBar";
import TaskListItem from "../tasks/TaskListItem";
import { Context as ProjectContext } from "../../context/store/ProjectStore";

import "../../css/Project.css";
import "../../css/TaskList.css";

const ProjectPage = () => {
  const { projectId, projectName } = useParams();
  const [projectState, projectdispatch] = useContext(ProjectContext);

  const [project, setProject] = useState();
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  const getProject = async () => {
    try {
      const res = await apiServer.get(`/project/${projectId}`);
      await projectdispatch({ type: "get_project", payload: res.data });

      // setProject(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const renderedTaskLists = projectState.userProject.TaskLists.map(
    (tasklist) => {
      return <TaskListItem tasklist={tasklist} />;
    }
  );

  return (
    <div>
      <TopNavBar name={projectState.userProject.name} />
      <div className="project-container">
        {renderedTaskLists}
        <div className="tasklist-new-tasklist--button">+ Add List</div>
      </div>
    </div>
  );
};

export default ProjectPage;
