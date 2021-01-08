import React, { useContext, useState } from "react";
import { BiRightArrow } from "react-icons/bi";
import { Context as TaskContext } from "../../context/store/TaskStore";
import "../../css/Task.css";
import TaskItemTask from "./TaskItemTask";
const TaskSection = ({ title, tasks }) => {
  const [open, setOpen] = useState(true);
  const [taskState] = useContext(TaskContext);

  const toggle = () => {
    setOpen(!open);
    let arrow = document.getElementById(`task-collapse-${title}`);
    arrow.classList.toggle("open-arrow-collapse");
    arrow.classList.toggle("open-arrow");
  };
  const taskList = tasks.map((task, i) => {
    return <TaskItemTask task={task} key={i} />;
  });
  return (
    <div className="task-section">
      <div className="task-section-header" onClick={toggle}>
        <div id={`task-collapse-${title}`} className="open-arrow">
          <BiRightArrow />
        </div>
        <h3 className="task-section-title">{title}</h3>
      </div>
      {open && <div className="task-section-list"> {taskList}</div>}
    </div>
  );
};

export default TaskSection;
