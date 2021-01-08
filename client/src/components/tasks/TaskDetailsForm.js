import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import "../../css/Task.css";
import moment from "moment";
import UserAvatar from "../NavigationBar/UserAvatar";
import apiServer from "../../config/apiServer";
import Button from "@material-ui/core/Button";

import { Context as TaskContext } from "../../context/store/TaskStore";
const TaskDetailsForm = ({
  task,
  closeModal,
  open,
  setTasks,
  setTasklistTasks,
}) => {
  const { register, handleSubmit } = useForm();
  const [taskState, taskdispatch] = useContext(TaskContext);
  const createdDate = moment(
    task.createdAt.substring(0, 10).replace("-", ""),
    "YYYYMMDD"
  );
  const updatedDate = moment(
    task.updatedAt.substring(0, 10).replace("-", ""),
    "YYYYMMDD"
  );

  const date = moment(
    task.due_date.substring(0, 10).replace("-", ""),
    "YYYYMMDD"
  );
  const dueDate = date.format("YYYY-MM-DD");

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  // console.log(task.completed);
  const getTaskUser = async () => {
    const res = await apiServer.get(`/user/${task.assignee_id}`);
    setUser(res.data);
    setLoading(false);
  };

  const onSubmit = async ({ name, due_date, description, completed }) => {
    // put route to update task
    try {
      await apiServer.put(`/task/${task.id}`, {
        name,
        due_date,
        description,
        completed,
      });
      //Updates new task list
      const res = await apiServer.get(
        `/task/user/${localStorage.getItem("userId")}`
      );
      await taskdispatch({ type: "update_task", payload: res.data });
      if (setTasklistTasks) {
        const taskres = await apiServer.get(
          `/tasklist/${task.tasklist_id}/tasks`
        );
        setTasklistTasks(taskres.data);
      }
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await apiServer.delete(`/task/${task.id}`);
      //Updates new task list
      const res = await apiServer.get(
        `/task/user/${localStorage.getItem("userId")}`
      );
      await taskdispatch({ type: "update_task", payload: res.data });
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTaskUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div></div>;
  }
  return (
    <div>
      <form className="task-details-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <textarea
            name="name"
            type="text"
            placeholder={"Task Name"}
            defaultValue={task.name}
            ref={register}
            className="edit-task-title textarea"
          ></textarea>
        </div>
        <div className="edit-task-info">
          <div
            className="edit-task-info-left"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="edit-task-user-avatar-container">
              <UserAvatar id={task.assignee_id} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "10px",
              }}
            >
              <div style={{ fontWeight: "500" }}>Assignee</div>
              <select
                style={{ marginTop: "10px", border: "none" }}
                name="assignee"
                defaultValue={user.name}
              >
                <option value={user.name}>{user.name}</option>
              </select>
              {/* <div>{user.name}</div> */}
            </div>
          </div>
          <div className="edit-task-info-mid">
            <input
              type="checkbox"
              name="completed"
              defaultChecked={task.completed}
              ref={register}
            ></input>
            <label htmlFor="completed" style={{ fontWeight: "500" }}>
              Mark Complete
            </label>
          </div>
          <div
            className="edit-task-info-right"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ fontWeight: "500", marginRight: "5px" }}>
                Created:{" "}
              </div>
              <div>{createdDate.format("MMM DD YYYY")}</div>
            </div>
            <div style={{ display: "flex", marginTop: "5px" }}>
              <div style={{ fontWeight: "500", marginRight: "5px" }}>
                Last Updated:{" "}
              </div>
              <div>{updatedDate.format("MMM DD YYYY")}</div>
            </div>
            <div style={{ marginTop: "5px", display: "flex" }}>
              <div
                style={{
                  fontWeight: "500",
                  marginRight: "5px",
                  alignSelf: "center",
                }}
              >
                Due:
              </div>
              <input
                className="edit-task-form-input"
                style={{ border: "1px solid black" }}
                type="date"
                name="due_date"
                defaultValue={dueDate}
                ref={register}
              ></input>
            </div>
          </div>
        </div>
        <div>
          <textarea
            name="description"
            type="text"
            placeholder={"Task Description"}
            defaultValue={task.description}
            ref={register}
            className="edit-task-description textarea"
          ></textarea>
        </div>
        <div style={{ display: "flex" }}>
          <div>
            <Button
              style={{ color: "red" }}
              onClick={handleDelete}
              color="primary"
            >
              Delete
            </Button>
          </div>
          <div style={{ display: "flex", marginLeft: "350px" }}>
            <Button
              style={{ color: "#0093ff" }}
              onClick={closeModal}
              color="primary"
            >
              Cancel
            </Button>
            <Button style={{ color: "#0093ff" }} type="submit" color="primary">
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskDetailsForm;
