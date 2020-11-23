import React from "react";

//Task item list for home and task page

const TaskItem = ({ task }) => {
  return (
    <li className="task-home-item">
      <div>
        <p>{task.name}</p>
      </div>
      Date
    </li>
  );
};

export default TaskItem;
