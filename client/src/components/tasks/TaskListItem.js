import React, { useEffect, useState } from "react";
import TaskItemProject from "./TaskItemProject";
import apiServer from "../../config/apiServer";
import "../../css/TaskList.css";
import Loader from "../Loader";
import { Modal } from "@material-ui/core";
import AddTaskProjectForm from "../Forms/AddTaskProjectForm";

//Project page task list
const TaskListItem = ({ tasklist }) => {
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

  const renderedTasks = tasks.map((task) => {
    return <TaskItemProject task={task} key={task.id} />;
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
      <div className="tasklist-container">
        <div className="tasklist-header">{tasklist.name}</div>
        <div className="tasklist-add-task--button"></div>
        <div className="tasklist-task--list">
          {renderedTasks}
          <div className="tasklist-new-task--button" onClick={openModal}>
            + Add task
          </div>
        </div>
      </div>
      <Modal open={open} onClose={closeModal}>
        {modalBody}
      </Modal>
    </div>
  );
};

export default TaskListItem;
