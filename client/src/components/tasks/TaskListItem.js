import React, { useEffect, useState } from "react";
import TaskItemProject from "./TaskItemProject";
import apiServer from "../../config/apiServer";
import "../../css/TaskList.css";
import Loader from "../Loader";
import { Modal } from "@material-ui/core";
import { Draggable, Droppable } from "react-beautiful-dnd";
import AddTaskProjectForm from "../Forms/AddTaskProjectForm";

//Project page task list
const TaskListItem = ({ index, tasklist }) => {
  const [tasks, setTasks] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const getTasks = async () => {
    try {
      const res = await apiServer.get(`/tasklist/${tasklist.id}/tasks`);
      setTasks(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTasks]);

  if (loading) {
    return <Loader />;
  }

  const renderedTasks = tasks.map((task, i) => {
    return (
      <TaskItemProject
        setTasks={setTasks}
        task={task}
        key={task.id}
        index={i}
      />
    );
  });

  const modalBody = (
    <div className="modal-container">
      <AddTaskProjectForm
        setTasks={setTasks}
        tasklistId={tasklist.id}
        projectId={tasklist.project_id}
        clickClose={closeModal}
        open={open}
      ></AddTaskProjectForm>
    </div>
  );
  return (
    <div>
      <Draggable
        type="tasklist"
        draggableId={`Column-${tasklist.column_index.toString()}`}
        index={index}
        key={`Column-${tasklist.id.toString()}`}
      >
        {(provided) => (
          <div
            className="tasklist-container"
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
          >
            <div className="tasklist-header">{tasklist.name}</div>
            <div className="tasklist-add-task--button"></div>
            <Droppable
              type="task"
              droppableId={`${tasklist.name}-${tasklist.id.toString()}`}
            >
              {(provided) => (
                <div
                  className="tasklist-task--list"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {renderedTasks}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <div className="tasklist-new-task--button" onClick={openModal}>
              + Add task
            </div>
          </div>
        )}
      </Draggable>
      <div>
        <Modal open={open} onClose={closeModal}>
          {modalBody}
        </Modal>
      </div>
    </div>
  );
};

export default TaskListItem;
