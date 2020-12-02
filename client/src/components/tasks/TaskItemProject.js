import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import TaskDetailsForm from "../tasks/TaskDetailsForm";
import "../../css/Modal.css";

//Project page task item for the task list
const TaskItemProject = ({ task, index }) => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };
  const modalBody = (
    <div className="modal-container">
      <TaskDetailsForm task={task} closeModal={closeModal} />
    </div>
  );
  return (
    <div>
      <Draggable draggableId={task.id.toString()} type="task" index={index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            className="task-project-item"
            onClick={openModal}
          >
            {task.name}
          </div>
        )}
      </Draggable>
      <Modal open={open} onClose={closeModal}>
        {modalBody}
      </Modal>
    </div>
  );
};

export default TaskItemProject;
