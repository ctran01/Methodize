import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Modal } from "@material-ui/core";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";
import TopNavBar from "../NavigationBar/TopNavBar";
import TaskListItem from "../tasks/TaskListItem";
import { Context as ProjectContext } from "../../context/store/ProjectStore";
import { Context as TasklistContext } from "../../context/store/TasklistStore";

import "../../css/Project.css";
import "../../css/TaskList.css";
import ProjectForm from "../Forms/ProjectForm";

const ProjectPage = () => {
  const { projectId, projectName } = useParams();
  const [projectState, projectdispatch] = useContext(ProjectContext);
  const [tasklistState, tasklistdispatch] = useContext(TasklistContext);
  const [open, setOpen] = useState(false);

  const [project, setProject] = useState();
  const [loading, setLoading] = useState(true);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const getProject = async () => {
    try {
      const res = await apiServer.get(`/project/${projectId}`);
      await projectdispatch({ type: "get_project", payload: res.data });

      // setProject(res.data);
      console.log(projectState);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getTasklists = async () => {
    try {
      const res = await apiServer.get(`/project/${projectId}/tasklists`);
      await tasklistdispatch({
        type: "get_project_tasklists",
        payload: res.data,
      });
      console.log(tasklistState);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProject();
    getTasklists();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const modalBody = (
    <div className="modal-container">
      <ProjectForm clickClose={closeModal} open={open}></ProjectForm>
    </div>
  );
  // const renderedTaskLists = projectState.userProject.TaskLists.map(
  const renderedTaskLists = tasklistState.tasklists.map((tasklist) => {
    return <TaskListItem tasklist={tasklist} />;
  });

  return (
    <div>
      <div>
        <TopNavBar name={projectState.userProject.name} />
        <div className="project-container">
          {renderedTaskLists}
          <div className="tasklist-new-tasklist--button">+ Add List</div>
        </div>
      </div>
      <Modal open={open} onClose={closeModal}>
        {modalBody}
      </Modal>
    </div>
  );
};

export default ProjectPage;
