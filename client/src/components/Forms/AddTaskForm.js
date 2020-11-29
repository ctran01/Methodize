import React, { useEffect, useState } from "react";
import "../../css/Task.css";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import { useForm } from "react-hook-form";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";
const TaskForm = ({ handleNewClose, clickClose, open }) => {
  const { register, handleSubmit, errors } = useForm();
  const [projects, setProjects] = useState();
  const [projectUsers, setProjectUsers] = useState([
    {
      id: "0",
      name: "Choose a Project First",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const getUserTeams = async () => {};

  const getUserProjects = async () => {
    const userId = localStorage.getItem("userId");
    const res = await apiServer.get(`/project/user/${userId}`);
    setProjects(res.data);
    setLoading(false);
  };

  const getProjectUsers = async (event) => {
    var select = document.getElementById("project-select");
    const res = await apiServer.get(`/project/${select.value}/users`);
    setProjectUsers(res.data);
  };

  useEffect(() => {
    getUserProjects();
  }, []);
  //Probably need dispatch here to update the task page when task is created.
  const onSubmit = async ({
    name,
    projectId,
    assigneeId,
    due_date,
    completed,
    description,
  }) => {
    console.log(name, "name");
    // var projectId = document.getElementById("project-select");

    console.log(projectId, "projectId");
    // var assigneeId = document.getElementById("assignee-select");

    console.log(assigneeId, "assigneeId");
    console.log(due_date, "due_date");
    console.log(completed, "completed");
    console.log(description, "description");
  };

  if (loading) {
    return <Loader />;
  }

  const renderedProjects = projects.map((project) => {
    return (
      <option id={project.id} value={project.id}>
        {project.name}
      </option>
    );
  });

  const renderedUsers = projectUsers.map((user) => {
    return <option value={user.id}>{user.name}</option>;
  });

  return (
    <div>
      <Modal open={open} onClose={clickClose}>
        <div className="modal-container">
          <form className="task-form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form-header">Add a Task</h2>
            <div className="form-top-container">
              <div className="form-top-left">
                <label className="form-label">
                  Task Name
                  <input
                    name="name"
                    type="text"
                    placeholder={"Task Name"}
                    className="form-input"
                    ref={register({ required: true })}
                  ></input>
                  {errors.name?.type === "required" && (
                    <p style={{ color: "red", margin: "1px" }}>
                      Please enter a task name
                    </p>
                  )}
                </label>
                <label className="form-label">
                  Project
                  <select
                    id="project-select"
                    name="projectId"
                    className="form-input"
                    onChange={getProjectUsers}
                    ref={register({ required: true })}
                  >
                    {renderedProjects}
                  </select>
                  {errors.projectId?.type === "required" && (
                    <p style={{ color: "red", margin: "1px" }}>
                      Please choose a project
                    </p>
                  )}
                </label>
              </div>
              <div className="form-top-middle">
                <label className="form-label">
                  Assignee
                  <select
                    id="assignee-select"
                    name="assigneeId"
                    className="form-input"
                    ref={register({ required: true })}
                  >
                    {renderedUsers}
                  </select>
                  {errors.assigneeId?.type === "required" && (
                    <p style={{ color: "red", margin: "1px" }}>
                      Please choose an assignee
                    </p>
                  )}
                </label>
                <label className="form-label">
                  Due date
                  <input
                    className="form-input"
                    type="date"
                    name="due_date"
                    ref={register({ required: true })}
                  ></input>
                  {errors.due_date?.type === "required" && (
                    <p style={{ color: "red", margin: "1px" }}>
                      Please choose a due_date
                    </p>
                  )}
                </label>
              </div>
              <div className="form-top-right" style={{ alignSelf: "normal" }}>
                <label className="form-label">
                  Mark Complete
                  <input
                    type="checkbox"
                    name="completed"
                    ref={register}
                  ></input>
                </label>
              </div>
              {/* <div className="task-info">
                <div
                  className="task-info-left"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div className="edit-task-user-avatar-container"></div>
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
              {/* </div>
                </div>
                <div className="task-info-mid">
                  <input type="checkbox" name="completed"></input>
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
                  </div>
                  <div style={{ display: "flex", marginTop: "5px" }}>
                    <div style={{ fontWeight: "500", marginRight: "5px" }}>
                      Last Updated:{" "}
                    </div>
                  </div>
                  <div style={{ marginTop: "5px", display: "flex" }}>
                    <div style={{ fontWeight: "500", marginRight: "5px" }}>
                      Due:
                    </div>
                    <input
                      style={{ border: "1px solid black" }}
                      type="date"
                      name="due_date"
                    ></input>
                  </div>
                </div>
              </div> */}{" "}
            </div>

            <div>
              <textarea
                name="description"
                type="text"
                placeholder={"Task Description"}
                className="edit-task-description textarea"
                ref={register}
              ></textarea>
            </div>

            <div style={{ display: "flex", marginLeft: "500px" }}>
              <Button
                style={{ color: "#0093ff" }}
                onClick={clickClose}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                style={{ color: "#0093ff" }}
                type="submit"
                color="primary"
              >
                Add
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default TaskForm;
