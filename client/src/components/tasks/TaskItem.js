import React, { useState } from "react";
import moment from "moment";
import { Modal } from "@material-ui/core";
import "../../css/Modal.css";
import TaskDetailsForm from "../tasks/TaskDetailsForm";
//Task item list for home and task page

const TaskItem = ({ task }) => {
  const date = moment(
    task.createdAt.substring(0, 10).replace("-", ""),
    "YYYYMMDD"
  );
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };
  //import component as body such as forms, details, etc
  const body = (
    <div className="modal-container">
      {/* <h2 id="modal-title">Task Detail</h2>
      <p id="modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p> */}
      <TaskDetailsForm task={task} closeModal={closeModal} />
    </div>
  );
  return (
    <div>
      <li className="task-home-item" onClick={openModal}>
        <div>
          <p>{task.name}</p>
        </div>
        {date.format("MMM D")}
        {/* {todaysDate.format("M D YYYY")} */}
      </li>
      <Modal open={open} onClose={closeModal}>
        {body}
      </Modal>
    </div>
  );
};

export default TaskItem;
