import React from "react";

//Project page task item for the task list
const TaskItemProject = ({ task }) => {
  return <div className="task-project-item"> {task.name}</div>;
};

export default TaskItemProject;
