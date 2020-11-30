import React, { useEffect, useState, useContext } from "react";
import "../../css/Task.css";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import { useForm } from "react-hook-form";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";
import { Context as ProjectContext } from "../../context/store/ProjectStore";
import { Context as TasklistContext } from "../../context/store/TasklistStore";

const AddTaskProjectForm = ({
  tasklistId,
  projectId,
  clickClose,
  open,
  setProject,
}) => {
  const { register, handleSubmit, errors, clearErrors } = useForm();
  const [projects, setProjects] = useState();
  // const [taskListError, setTaskListError] = useState();
  // const [projectError, setProjectError] = useState();
  const [assigneeError, setAssigneeError] = useState();
  const [projectState, projectdispatch] = useContext(ProjectContext);
  const [tasklistState, tasklistdispatch] = useContext(TasklistContext);

  const [projectUsers, setProjectUsers] = useState();
  const [projectTaskLists, setProjectTaskLists] = useState([
    {
      id: "0",
      name: "Choose a Project First",
    },
  ]);

  const [loading, setLoading] = useState(true);

  // const getUserProjects = async () => {
  //   const userId = localStorage.getItem("userId");
  //   const res = await apiServer.get(`/project/user/${userId}`);
  //   setProjects(res.data);
  //   setLoading(false);
  // };

  const getProjectUsers = async (event) => {
    const res = await apiServer.get(`/project/${projectId}/users`);
    setProjectUsers(res.data);
    setLoading(false);
    // getProjectTasklists();
  };

  const getProjectTasklists = async (event) => {
    const select = document.getElementById("project-select");
    const res = await apiServer.get(`/project/${select.value}/tasklists`);
    setProjectTaskLists(res.data);
  };

  useEffect(() => {
    getProjectUsers();
  }, []);

  //Probably need dispatch here to update the task page when task is created.

  const onSubmit = async ({
    name,
    assigneeId,
    due_date,
    completed,
    description,
  }) => {
    await apiServer.post(`/tasklist/${tasklistId}/task`, {
      name,
      projectId,
      assigneeId,
      due_date,
      completed,
      description,
    });

    const res = await apiServer.get(`/project/${projectId}`);
    setProject(res.data);
    // await projectdispatch({ type: "get_project", payload: res.data });
    // const res = await apiServer.get(`/project/${projectId}/tasklists`);
    // await tasklistdispatch({
    //   type: "get_project_tasklists",
    //   payload: res.data,
    // });
    // window.location.reload();

    clickClose();
  };

  if (loading) {
    return <Loader />;
  }

  const renderedUsers = projectUsers.map((user, i) => {
    return (
      <option key={i} value={user.id}>
        {user.name}
      </option>
    );
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
                    <p className="error-message">Please enter a task name</p>
                  )}
                </label>
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
                  <p className="error-message">{assigneeError}</p>
                  {errors.assigneeId?.type === "required" && (
                    <p className="error-message">Please choose an assignee</p>
                  )}
                </label>
              </div>
              <div className="form-top-middle">
                <label className="form-label">
                  Due date
                  <input
                    className="form-input"
                    type="date"
                    name="due_date"
                    ref={register({ required: true })}
                  ></input>
                  {errors.due_date?.type === "required" && (
                    <p className="error-message">Please choose a due_date</p>
                  )}
                </label>
                <label
                  className="form-label"
                  style={{ padding: "10px 5px 10px 0px" }}
                >
                  Mark Complete
                  <input
                    style={{ margin: "10px 0" }}
                    type="checkbox"
                    name="completed"
                    ref={register}
                  ></input>
                </label>
              </div>
              <div className="form-top-right"></div>
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

export default AddTaskProjectForm;
