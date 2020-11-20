import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";
import TopNavBar from "../NavigationBar/TopNavBar";
import TaskListItem from "../tasks/TaskListItem";
const Project = () => {
  const { projectId, projectName } = useParams();

  const [project, setProject] = useState();
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  const getProject = async () => {
    try {
      const res = await apiServer.get(`/project/${projectId}`);
      setProject(res.data);
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

  const renderedTaskLists = project.TaskLists.map((tasklist) => {
    return <TaskListItem tasklist={tasklist} />;
  });

  return (
    <div>
      <TopNavBar name={project.name} />
      <div className="project-container">{renderedTaskLists}</div>
    </div>
  );
};

export default Project;
