import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import TaskDetailsForm from "../tasks/TaskDetailsForm";
import "../../css/Modal.css";

//Project page task item for the task list
const TaskItemProject = ({ task }) => {
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
      <div className="task-project-item" onClick={openModal}>
        {" "}
        {task.name}
      </div>
      <Modal open={open} onClose={closeModal}>
        {modalBody}
      </Modal>
    </div>
  );
};

export default TaskItemProject;
