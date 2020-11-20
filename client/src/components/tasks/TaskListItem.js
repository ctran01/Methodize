import React, { useEffect, useState } from "react";
import TaskItemProject from "./TaskItemProject";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";
const TaskListItem = ({ tasklist }) => {
  const [tasks, setTasks] = useState();
  const [loading, setLoading] = useState(true);

  const getTasks = async () => {
    try {
      const res = await apiServer.get(`/tasklist/${tasklist.id}/tasks`);
      setTasks(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const renderedTasks = tasks.map((task) => {
    return <TaskItemProject task={task} />;
  });
  return (
    <div className="tasklist-container">
      <div className="tasklist-header">{tasklist.name}</div>
      <div className="tasklist-add-task--button"></div>
      <div className="tasklist-task--list">{renderedTasks}</div>
    </div>
  );
};

export default TaskListItem;
