import React from "react";

const TaskItem = ({ task }) => {
  return <li className="upcoming-task--li">{task.name}</li>;
};

export default TaskItem;
