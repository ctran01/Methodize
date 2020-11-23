import React, { useContext, useEffect } from "react";
import TopNavBarTask from "../NavigationBar/TopNavBarTask";
import "../../css/Task.css";
import { Context as TaskContext } from "../../context/store/TaskStore";
import apiServer from "../../config/apiServer";
import TaskSection from "../tasks/TaskSection";

const TasksPage = () => {
  const [taskState, taskdispatch] = useContext(TaskContext);

  const getUserTasks = async () => {
    const id = localStorage.getItem("userId");
    const res = await apiServer.get(`/task/user/${id}`);
    await taskdispatch({ type: "get_user_tasks", payload: res.data });
  };

  useEffect(() => {
    getUserTasks();
  }, []);

  return (
    <>
      <TopNavBarTask />
      <div className="tasks-container">
        <div className="tasks-inner-container">
          <div className="tasks-container-header">Add Task</div>
          <TaskSection title={"Recently Assigned"} />
          <TaskSection title={"Today"} />
          {/* <div className="recently-assigned-tasks-container">
            <div className="task--header">
              <h3>Recently Assigned</h3>
            </div>
            <ul className="task--list">
              {taskState.tasks.map((task) => {
                return <li key={task.id}>{task.name}</li>;
              })}
            </ul>
          </div> */}
          {/* <div className="today-tasks-container">
            <div className="task--header">
              <h3>Today</h3>
            </div>
            <ul className="task--list">
              <li className="task">task 1</li>
              <li className="task">task 2</li>
              <li className="task">task 3</li>
            </ul>
          </div>
          <div className="upcoming-tasks-container">
            <div className="task--header">
              <h3>Upcoming</h3>
            </div>
            <ul className="task--list">
              <li className="task">task 1</li>
              <li className="task">task 2</li>
              <li className="task">task 3</li>
            </ul>
          </div>
          <div className="later-tasks-container">
            <div className="task--header">
              <h3>Later</h3>
            </div>
            <ul className="task--list">
              <li className="task">task 1</li>
              <li className="task">task 2</li>
              <li className="task">task 3</li>
            </ul>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default TasksPage;
