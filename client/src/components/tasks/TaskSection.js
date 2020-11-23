import React, { useContext, useState } from "react";
import { BiRightArrow } from "react-icons/bi";
import { Context as TaskContext } from "../../context/store/TaskStore";
import "../../css/Task.css";
import TaskItem from "./TaskItem";
const TaskSection = ({ title }) => {
  const [open, setOpen] = useState(true);
  const [taskState] = useContext(TaskContext);

  const toggle = () => {
    setOpen(!open);
  };
  const taskList = taskState.tasks.map((task, i) => {
    return <TaskItem task={task} key={i} />;
  });
  return (
    <div className="task-section">
      <div className="task-section-header" onClick={toggle}>
        <BiRightArrow style={{ alignSelf: "center", padding: "0 5px" }} />
        <h3>{title}</h3>
      </div>
      {open && <ui className="task-section-list"> {taskList}</ui>}
    </div>
  );
};

export default TaskSection;
