import React from "react";

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
