import React from "react";

const TaskItem = ({ task }) => {
  return (
    <li className="task--li">
      <div>
        <p>{task.name}</p>
      </div>
      Date
    </li>
  );
};

export default TaskItem;
