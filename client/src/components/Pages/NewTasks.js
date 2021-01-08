import React, { useContext, useEffect, useState } from "react";
import TopNavBarTask from "../NavigationBar/TopNavBarTask";
import { Context as TaskContext } from "../../context/store/TaskStore";
import apiServer from "../../config/apiServer";
import TaskSection from "../tasks/TaskSection";
import PopOutTaskDetails from "../PopOutMenu/PopOutTaskDetails";
import TaskItemTask from "../tasks/TaskItemTask";
import Add from "../../assets/Add";
import AddTaskPopOutTaskPage from "../PopOutMenu/AddTaskPopOutTaskPage";

const NewTasks = () => {
  const [taskState, taskdispatch] = useContext(TaskContext);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [sideTaskForm, setSideTaskForm] = useState(false);

  const [sideTaskDetails, setSideTaskDetails] = useState(false);

  const showSideTaskForm = () => {
    setSideTaskDetails(false);
    setSideTaskForm(!sideTaskForm);
  };
  const showSideTaskDetails = () => {
    setSideTaskForm(false);
    setSideTaskDetails(!sideTaskDetails);
  };

  const getUserTasks = async () => {
    const id = localStorage.getItem("userId");
    const res = await apiServer.get(`/task/user/${id}`);
    await taskdispatch({ type: "get_user_tasks", payload: res.data });
    // setTasks(res.data);
    setLoading(false);
  };

  const sortedTasks = taskState.tasks.sort(function (a, b) {
    return new Date(a.due_date) - new Date(b.due_date);
  });

  const renderedTasks = sortedTasks.map((task, i) => {
    return (
      <TaskItemTask
        task={task}
        key={i}
        showSideTaskDetails={showSideTaskDetails}
        sideTaskDetails={sideTaskDetails}
        setInitialLoad={setInitialLoad}
      />
    );
  });
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUserTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TopNavBarTask />
      <div className="tasks-container">
        {/* <div className="tasks-container-header"></div> */}
        <div className="tasks-main-content">
          <div
            className={
              taskState.selectedTask || initialLoad
                ? "tasks-inner-container"
                : "tasks-inner-container hidden"
            }
          >
            <div
              className="tasks-add-task-container"
              onClick={showSideTaskForm}
            >
              <div className="tasks-add-task-icon">
                <Add />
              </div>
              <div className="add-task-button">
                <p style={{ margin: "2px 0px 0px 0px", paddingLeft: "5px" }}>
                  Add Task
                </p>
              </div>
            </div>
            {renderedTasks}
            {/* <TaskSection title={"Tasks"} tasks={sortedTasks} /> */}
          </div>
          {sideTaskDetails && taskState.selectedTask ? (
            <PopOutTaskDetails
              showSideTaskDetails={showSideTaskDetails}
              sideTaskDetails={sideTaskDetails}
            />
          ) : null}
          {sideTaskForm ? (
            <AddTaskPopOutTaskPage
              showSideTaskForm={showSideTaskForm}
              title={"Add a Task"}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default NewTasks;
