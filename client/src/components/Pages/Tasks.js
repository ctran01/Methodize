import React, { useContext, useEffect, useState } from "react";
import TopNavBarTask from "../NavigationBar/TopNavBarTask";
import "../../css/Task.css";
import { Context as TaskContext } from "../../context/store/TaskStore";
import apiServer from "../../config/apiServer";
import TaskSection from "../tasks/TaskSection";
import moment from "moment";

const TasksPage = () => {
  const [taskState, taskdispatch] = useContext(TaskContext);
  const [tasks, setTasks] = useState();
  const [loading, setLoading] = useState(true);
  const getUserTasks = async () => {
    const id = localStorage.getItem("userId");
    const res = await apiServer.get(`/task/user/${id}`);
    // await taskdispatch({ type: "get_user_tasks", payload: res.data });
    setTasks(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getUserTasks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const recentlyAdded = tasks.filter((task) => {
    const date = new Date(task.createdAt);
    const createdDate = moment(date);
    const todaysDate = moment(new Date());
    const previousDate = moment(new Date()).subtract(1, "week");
    return createdDate.isBetween(previousDate, todaysDate); //created date is between previous week and today
  });

  const todaysTasks = tasks.filter((task) => {
    const date = new Date(task.due_date);
    const dueDate = moment(date).format("M D YYYY");
    const todaysDate = moment(new Date()).format("M D YYYY");
    return dueDate === todaysDate; //due date is today
  });

  const upcomingTasks = tasks.filter((task) => {
    const date = new Date(task.due_date);
    const dueDate = moment(date);
    const todaysDate = moment(new Date());
    const upcomingDate = moment(new Date()).add(1, "week");
    return dueDate.isBetween(todaysDate, upcomingDate); //due date is between today and a week
  });

  const laterTasks = tasks.filter((task) => {
    const date = new Date(task.due_date);
    const dueDate = moment(date);
    const laterDate = moment(new Date()).add(1, "week");
    return dueDate.isAfter(laterDate); //due date is after 1 week
  });

  return (
    <>
      <TopNavBarTask />
      <div className="tasks-container">
        <div className="tasks-inner-container">
          <div className="tasks-container-header">
            <button className="add-task-button">Add Task</button>
          </div>
          <TaskSection title={"Recently Added"} tasks={recentlyAdded} />
          <TaskSection title={"Today"} tasks={todaysTasks} />
          <TaskSection title={"Upcoming"} tasks={upcomingTasks} />
          <TaskSection title={"Later"} tasks={laterTasks} />
        </div>
      </div>
    </>
  );
};

export default TasksPage;
