import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Modal } from "@material-ui/core";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";
import TopNavBar from "../NavigationBar/TopNavBar";
import TaskListItem from "../tasks/TaskListItem";
import TaskListForm from "../Forms/TaskListForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "../../css/Project.css";
import "../../css/TaskList.css";

const ProjectPage = () => {
  const { projectId, projectName, teamId } = useParams();
  const [open, setOpen] = useState(false);

  const [project, setProject] = useState();
  const [tasklists, setTasklists] = useState();
  const [loading, setLoading] = useState(true);

  const [homeIndex, setHomeIndex] = useState("");

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };
  const onDragStart = (start) => {
    const { source } = start;

    console.log(start);
  };
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    console.log("destination: ", destination);
    console.log("source: ", source);
    console.log("draggableId: ", draggableId);
    console.log("type: ", type);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const getProject = async () => {
    try {
      const res = await apiServer.get(`/project/${projectId}`);
      // await projectdispatch({ type: "get_project", payload: res.data });
      await getTasklists();
      setProject(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getTasklists = async () => {
    try {
      const res = await apiServer.get(`/project/${projectId}/tasklists`);
      // await tasklistdispatch({
      //   type: "get_project_tasklists",
      //   payload: res.data,
      // });
      setTasklists(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setProject, setTasklists]);

  if (loading) {
    return <Loader />;
  }

  //Task list creation
  const modalBody = (
    <div className="modal-container">
      <TaskListForm
        setTasklists={setTasklists}
        projectId={projectId}
        clickClose={closeModal}
        open={open}
      ></TaskListForm>
    </div>
  );
  // const renderedTaskLists = projectState.userProject.TaskLists.map(
  const renderedTaskLists = tasklists.map((tasklist, i) => {
    return (
      <TaskListItem
        index={i}
        teamId={teamId}
        tasklist={tasklist}
        key={tasklist.id}
      />
    );
  });

  return (
    <div>
      <div>
        <TopNavBar name={project.name} />
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className="project-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {renderedTaskLists}

                <div
                  className="tasklist-new-tasklist--button"
                  onClick={openModal}
                >
                  + Add List
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <Modal open={open} onClose={closeModal}>
        {modalBody}
      </Modal>
    </div>
  );
};

export default ProjectPage;
