import React, { useContext, useEffect } from "react";
import TopNavBarTask from "../NavigationBar/TopNavBarTask";
import "../../css/Task.css";
import { Context as TaskContext } from "../../context/TaskContext";
const Tasks = () => {
  const { state, getUserTasks } = useContext(TaskContext);

  useEffect(() => {
    getUserTasks();
  }, []);
  return (
    <>
      <TopNavBarTask />
      <div className="tasks-container">
        <div className="tasks-inner-container">
          <div className="recently-assigned-tasks-container">
            <div className="task--header">
              <h3>Recently Assigned</h3>
            </div>
            <ul className="task--list">
              <li className="task">task 1</li>
              <li className="task">task 2</li>
              <li className="task">task 3</li>
            </ul>
          </div>
          <div className="today-tasks-container">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
