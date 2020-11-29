import React, { useContext, useEffect, useState } from "react";
import { Modal } from "@material-ui/core";
import TopNavBarTask from "../NavigationBar/TopNavBarTask";
import "../../css/Task.css";
import { Context as TaskContext } from "../../context/store/TaskStore";
import apiServer from "../../config/apiServer";
import TaskSection from "../tasks/TaskSection";
import moment from "moment";
import TaskForm from "../Forms/AddTaskForm";

const TasksPage = () => {
  const [taskState, taskdispatch] = useContext(TaskContext);
  const [tasks, setTasks] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const getUserTasks = async () => {
    const id = localStorage.getItem("userId");
    const res = await apiServer.get(`/task/user/${id}`);
    await taskdispatch({ type: "get_user_tasks", payload: res.data });
    // setTasks(res.data);
    setLoading(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUserTasks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const modalBody = (
    <div className="modal-container">
      <TaskForm clickClose={closeModal} open={open}></TaskForm>
    </div>
  );

  const recentlyAdded = taskState.tasks.filter((task) => {
    const date = new Date(task.createdAt);
    const createdDate = moment(date);
    const todaysDate = moment(new Date());
    const previousDate = moment(new Date()).subtract(1, "week");
    return createdDate.isBetween(previousDate, todaysDate); //created date is between previous week and today
  });

  const todaysTasks = taskState.tasks.filter((task) => {
    const date = new Date(task.due_date);
    const dueDate = moment(date).format("M D YYYY");
    const todaysDate = moment(new Date()).format("M D YYYY");
    return dueDate === todaysDate; //due date is today
  });

  const upcomingTasks = taskState.tasks.filter((task) => {
    const date = new Date(task.due_date);
    const dueDate = moment(date);
    const todaysDate = moment(new Date());
    const upcomingDate = moment(new Date()).add(1, "week");
    return dueDate.isBetween(todaysDate, upcomingDate); //due date is between today and a week
  });

  const laterTasks = taskState.tasks.filter((task) => {
    const date = new Date(task.due_date);
    const dueDate = moment(date);
    const laterDate = moment(new Date()).add(1, "week");
    return dueDate.isAfter(laterDate); //due date is after 1 week
  });

  return (
    <>
      <TopNavBarTask />
      <div className="tasks-container">
        <div className="tasks-inner-container">
          <div className="tasks-container-header">
            <div>
              <button className="add-task-button" onClick={openModal}>
                Add Task
              </button>
            </div>
            <div style={{ fontSize: "14px", alignSelf: "center" }}>
              Due Date
            </div>
          </div>
          <TaskSection title={"Recently Added"} tasks={recentlyAdded} />
          <TaskSection title={"Today"} tasks={todaysTasks} />
          <TaskSection title={"Upcoming"} tasks={upcomingTasks} />
          <TaskSection title={"Later"} tasks={laterTasks} />
        </div>
      </div>
      <Modal open={open} onClose={closeModal}>
        {modalBody}
      </Modal>
    </>
  );
};

export default TasksPage;
