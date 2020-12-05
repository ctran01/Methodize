import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import TaskDetailsForm from "../tasks/TaskDetailsForm";
import "../../css/Modal.css";

//Project page task item for the task list
const TaskItemProject = ({ task, index, setTasklistTasks }) => {
  const [open, setOpen] = useState(false);
  // console.log(task);
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };
  const modalBody = (
    <div className="modal-container">
      <TaskDetailsForm
        // setTasks={setTasks}
        setTasklistTasks={setTasklistTasks}
        task={task}
        closeModal={closeModal}
      />
    </div>
  );
  return (
    <div>
      <Draggable
        draggableId={`${task.id.toString()}`}
        type="task"
        //this index needs to pull from tasksArray
        index={index}
      >
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="task-project-item"
            onClick={openModal}
          >
            {task.name}
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

export default TaskItemProject;
