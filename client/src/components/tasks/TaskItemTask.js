import React, { useState, useContext } from "react";
import moment from "moment";
import { Modal } from "@material-ui/core";
import "../../css/Modal.css";
import TaskDetailsForm from "../tasks/TaskDetailsForm";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { Context as TaskContext } from "../../context/store/TaskStore";
import apiServer from "../../config/apiServer";

//Task item list for home and task page

const TaskItemTask = ({
  task,
  showSideTaskDetails,
  sideTaskDetails,
  setInitialLoad,
}) => {
  const [taskState, taskdispatch] = useContext(TaskContext);
  const [open, setOpen] = useState(false);

  const date = moment(
    task.due_date.substring(0, 10).replace("-", ""),
    "YYYYMMDD"
  );
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const setTaskPopOut = async () => {
    if (sideTaskDetails === false) {
      showSideTaskDetails();
      //---
      taskdispatch({ type: "get_selected_task", payload: null });
      const res = await apiServer.get(`/task/${task.id}`);
      await taskdispatch({ type: "get_selected_task", payload: res.data });
      setInitialLoad(false);
      console.log("if popout");
    } else {
      console.log("else popout");
      taskdispatch({ type: "get_selected_task", payload: null });
      const res = await apiServer.get(`/task/${task.id}`);
      await taskdispatch({ type: "get_selected_task", payload: res.data });
      setInitialLoad(false);
    }
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
    <>
      <li className="task-task-item" onClick={setTaskPopOut}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {task.completed ? (
            <RiCheckboxCircleLine
              style={{ color: "green", fontSize: "16px" }}
            />
          ) : (
            <RiCheckboxBlankCircleLine style={{ fontSize: "16px" }} />
          )}
          <p
            style={{
              paddingLeft: "5px",
              color: "gray",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
            }}
          >
            {task.name}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            className={`task-project-home-name-container task-project-${task.Project.id}`}
          >
            <p
              style={{
                margin: "0px",
                padding: "5px",
                fontSize: "12px",
                fontWeight: "500",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
              }}
            >
              {task.Project.name}
            </p>
          </div>
          <div
            style={{
              width: "73px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <p
              style={{
                color: "gray",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
              }}
            >
              {date.format("MMM D YYYY")}
            </p>
          </div>
        </div>
      </li>
      {/* <Modal open={open} onClose={closeModal}>
        {body}
      </Modal> */}
    </>
  );
};

export default TaskItemTask;
