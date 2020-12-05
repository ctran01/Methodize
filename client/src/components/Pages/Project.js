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
  const [taskArray, setTaskArray] = useState();
  //Task through get /project/id/taskslists. Set here so we can refer to it in the ondragend funnction
  const [loading, setLoading] = useState(true);
  const [homeIndex, setHomeIndex] = useState("");

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const onDragEnd = async (result) => {
    console.log(result, "result");
    const { destination, source, draggableId, type } = result;
    console.log(tasklists, "initial columns");
    console.log(taskArray, "initial tasks");

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const redorderedLists = reorder(
        tasklists,
        source.index,
        destination.index
      );
      setTasklists(redorderedLists);
      // console.log(redorderedLists, "reordedLists");
      redorderedLists.map((list, index) => {
        return updateTasklist(index, list.id, list.column_index);
      });
    }

    if (type === "task") {
      // const reorderedTasks = reorder(
      //   taskArray,
      //   source.index,
      //   destination.index
      // );
      // setTaskArray(reorderedTasks);
      // console.log(reorderedTasks, "reorderedTasks");

      // change draggableId of task to ID
      const sourceColumnId = source.droppableId;
      const destinationColumnId = destination.droppableId;

      const updatedTasklist = await apiServer.put(
        `/task/${draggableId}/tasklist`,
        { destinationColumnId }
      ); // this will update the inital task with the new tasklist id

      //Draggable Id === Task.id
      //source.droppableId === initial tasklist.id
      //destination.droppableId === destination tasklist.id

      // once that comes back, we want to update the task_index of that task to destination.index
      const destinationIndex = destination.index;
      const updatedTaskIndex = await apiServer.put(
        `/task/${draggableId}/taskindex`,
        { destinationIndex }
      );

      // once that comes back, we will  update task_indexes for tasklists then re render

      console.log("source: ", source);
      console.log("destination: ", destination);
      console.log("draggableId: ", draggableId);
      console.log("type: ", type);
      // reorderedTasks.map((task, index) => {
      //   return updateTasks(
      //     index,
      //     task.id,
      //     task.task_index,
      //     source.droppableId,
      //     destination.droppableId
      //   );
      // });
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const reorderTask = (tasklistArray, taskArray, source, destination) => {};

  const updateTasklist = async (newIndex, tasklistId, columnIndex) => {
    // console.log(tasklistId, "tasklistid");
    // console.log(newIndex, "newIndex");
    await apiServer.put(`/tasklist/${tasklistId}/columnindex/`, { newIndex });
  };

  const updateTasks = async (
    newIndex,
    taskId,
    taskIndex,
    sourceColumnId,
    destinationColumnId
  ) => {
    await apiServer.put(`/task/${taskId}/taskindex`, {
      newIndex,
      sourceColumnId,
      destinationColumnId,
    });
  };

  const getProject = async () => {
    try {
      const res = await apiServer.get(`/project/${projectId}`);
      // setTasklists(res.data.TaskLists);
      await getTasklists();
      setProject(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //NOTE: MAYBE TRY GRABBING TASKS IN ONE GET API CALL AND PUSHING IT DOWN?
  const getTasklists = async () => {
    try {
      const res = await apiServer.get(`/project/${projectId}/tasklists`);
      setTasklists(res.data);
      const taskResponse = await apiServer.get(`/project/${projectId}/tasks`);
      setTaskArray(taskResponse.data); //Array of all tasks
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setProject, setTasklists, setTaskArray]);

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

  return (
    <div>
      <div>
        <TopNavBar name={project.name} setTasklists={setTasklists} />
        <DragDropContext onDragEnd={onDragEnd}>
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
                {/* {renderedTaskLists} */}
                {tasklists.map((tasklist, i) => {
                  return (
                    <TaskListItem
                      index={i}
                      teamId={teamId}
                      tasklist={tasklist}
                      key={tasklist.id}
                      tasks={tasklist.Tasks}

                      // setTasks={setTasks}
                    />
                  );
                })}
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
