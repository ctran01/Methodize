import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import "../../css/Task.css";
import moment from "moment";
import UserAvatar from "../NavigationBar/UserAvatar";
import apiServer from "../../config/apiServer";
import Button from "@material-ui/core/Button";

import { Context as TaskContext } from "../../context/store/TaskStore";
const TaskDetailsForm = ({ task, closeModal, open }) => {
  const { register, handleSubmit, errors } = useForm();
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
    //put route to update task
    // try {
    //   await apiServer.put(`/task/${task.id}`, {
    //     name,
    //     due_date,
    //     description,
    //     completed,
    //   });
    //   //Updates new task list
    //   const res = await apiServer.get(
    //     `/task/user/${localStorage.getItem("userId")}`
    //   );
    //   await taskdispatch({ type: "update_task", payload: res.data });
    //   closeModal();
    // } catch (err) {
    //   console.log(err);
    // }
    console.log(name);
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
            className="task-info-right"
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
              <div style={{ fontWeight: "500", marginRight: "5px" }}>Due:</div>
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

        <div style={{ display: "flex", marginLeft: "400px" }}>
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

        {/* <Dialog
          open={open}
          onClose={closeModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add a Project</DialogTitle>
          <DialogContent>
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
                  <select style={{ marginTop: "10px" }} name="assignee">
                    <option value={user.name}>{user.name}</option>
                  </select>
                  <div>{user.name}</div>
                </div>
              </div>
              <div className="task-info-mid">
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
                className="task-info-right"
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
                  <div style={{ fontWeight: "500", marginRight: "5px" }}>
                    Due:
                  </div>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog> */}
      </form>
    </div>
  );
};

export default TaskDetailsForm;
