import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import "../../css/Task.css";
import moment from "moment";
import UserAvatar from "../NavigationBar/UserAvatar";
import apiServer from "../../config/apiServer";

import { Context as TaskContext } from "../../context/store/TaskStore";
const TaskDetailsForm = ({ task, closeModal }) => {
  const { register, handleSubmit, errors } = useForm();
  const createdDate = moment(
    task.createdAt.substring(0, 10).replace("-", ""),
    "YYYYMMDD"
  );

  const [taskState, taskdispatch] = useContext(TaskContext);
  const date = moment(task.due_date);
  const dueDate = date.format("YYYY-MM-DD");

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const getTaskUser = async () => {
    const res = await apiServer.get(`/user/${task.assignee_id}`);
    setUser(res.data);
    setLoading(false);
  };

  const onSubmit = async ({ name, due_date, description, completed }) => {
    //put route to update task
    try {
      await apiServer.put(`/task/${task.id}`, {
        name,
        due_date,
        description,
        completed,
      });
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
        <div className="task-info">
          <div
            className="task-info-left"
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
              {/* <select style={{ marginTop: "10px" }} name="assignee">
                <option value={user.name}>{user.name}</option>
              </select> */}
              <div>{user.name}</div>
            </div>
          </div>
          <div className="task-info-mid">
            <input type="checkbox" name="completed" ref={register}></input>
            <label htmlFor="completed" style={{ fontWeight: "500" }}>
              Mark Complete
            </label>
          </div>
          <div
            className="task-info-right"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ fontWeight: "500", marginRight: "5px" }}>
                Created On:{" "}
              </div>
              <div>{createdDate.format("MMM DD YYYY")}</div>
            </div>
            <div>
              <p style={{ fontWeight: "500" }}>Due On:</p>
              <input
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

        <button className="edit-task-button" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default TaskDetailsForm;
