import React, { useState, useContext } from "react";
import "../../css/Task.css";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import { useForm } from "react-hook-form";
import apiServer from "../../config/apiServer";
import { Context as ProjectContext } from "../../context/store/ProjectStore";
import { Context as TasklistContext } from "../../context/store/TasklistStore";
import { Context as TaskContext } from "../../context/store/TaskStore";

//Form to add task from anywhere
const TaskForm = ({
  handleNewClose,
  clickClose,
  open,
  setTasklists,
  showSideTaskForm,
}) => {
  const { register, handleSubmit, errors, clearErrors } = useForm();
  const [projectError, setProjectError] = useState();
  const [assigneeError, setAssigneeError] = useState();
  const [taskName, setTaskName] = useState();
  const [dueDate, setDueDate] = useState();

  const [projectState, projectdispatch] = useContext(ProjectContext);
  const [taskState, taskdispatch] = useContext(TaskContext);
  const [projectUsers, setProjectUsers] = useState([
    {
      id: "0",
      name: "Choose a Project First",
    },
  ]);
  const [projectTaskLists, setProjectTaskLists] = useState([
    {
      id: "0",
      name: "Choose a Project First",
    },
  ]);

  // const getUserProjects = async () => {
  //   const userId = localStorage.getItem("userId");
  //   const res = await apiServer.get(`/project/user/${userId}`);
  //   setProjects(res.data);
  //   setLoading(false);
  // };

  const handleNameChange = (e) => {
    setTaskName(e.target.value);
  };
  const handleDateChange = (e) => {
    setDueDate(e.target.value);
  };
  const getProjectUsers = async (event) => {
    var projectSelect = document.getElementById("project-select");
    var assigneeSelect = document.getElementById("assignee-select");
    var tasklistSelect = document.getElementById("tasklist-select");
    clearErrors(projectSelect.name);
    clearErrors(assigneeSelect.name);
    clearErrors(tasklistSelect.name);
    const res = await apiServer.get(`/project/${projectSelect.value}/team`);
    setProjectUsers(res.data.Users);
    getProjectTasklists();
  };

  const getProjectTasklists = async (event) => {
    const select = document.getElementById("project-select");
    const res = await apiServer.get(`/project/${select.value}/tasklists`);
    setProjectTaskLists(res.data);
  };

  // useEffect(() => {
  //   getUserProjects();
  // }, []);
  //Probably need dispatch here to update the task page when task is created.
  const onSubmit = async ({
    name,
    projectId,
    assigneeId,
    due_date,
    tasklistId,
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

    // const res = await apiServer.get(
    //   `/project/user/${localStorage.getItem("userId")}`
    // );

    const userId = localStorage.getItem("userId");
    const res = await apiServer.get(`/task/user/${userId}`);
    await taskdispatch({ type: "get_user_tasks", payload: res.data });

    if (setTasklists) {
      const taskResponse = await apiServer.get(
        `/project/${projectId}/tasklists`
      );

      setTasklists(taskResponse.data);
    }

    showSideTaskForm();
  };

  const renderedProjects = projectState.projects.map((project, i) => {
    return (
      <option key={i} id={project.id} value={project.id}>
        {project.name}
      </option>
    );
  });

  const renderedUsers = projectUsers.map((user, i) => {
    return (
      <option key={i} value={user.id}>
        {user.name}
      </option>
    );
  });

  const renderedTasklists = projectTaskLists.map((tasklist, i) => {
    return (
      <option key={i} value={tasklist.id}>
        {tasklist.name}
      </option>
    );
  });

  return (
    <>
      {/* <Modal open={open} onClose={clickClose}>
        <div className="modal-container"> */}
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        {/* <h2 className="form-header">Add a Task</h2> */}
        <div className="form-top-container">
          <div className="form-section">
            <div className="label-container">
              <label className="form-label">Task Name</label>
            </div>
            <div className="input-container">
              <input
                name="name"
                type="text"
                placeholder={"Task Name"}
                className="form-input"
                ref={register({ required: true })}
                onChange={handleNameChange}
              ></input>
              {errors.name?.type === "required" && (
                <p className="error-message">Please enter a task name</p>
              )}
            </div>

            <div className="label-container">
              <label className="form-label">Project</label>
            </div>
            <div className="input-container">
              <select
                id="project-select"
                name="projectId"
                className="form-input"
                onChange={getProjectUsers}
                ref={register({ required: true })}
              >
                <option value={0}>{"<---Choose Project--->"}</option>
                {renderedProjects}
              </select>
              <p className="error-message">{projectError}</p>
              {errors.projectId?.type === "required" && (
                <p className="error-message">Please choose a project</p>
              )}
            </div>
          </div>
          <div className="form-section">
            <div className="label-container">
              <label className="form-label">Due date</label>
            </div>
            <div className="input-container">
              <input
                className="form-input"
                type="date"
                name="due_date"
                ref={register({ required: true })}
                onChange={handleDateChange}
              ></input>
              {errors.due_date?.type === "required" && (
                <p className="error-message">Please choose a Due Date</p>
              )}
            </div>
            <div className="label-container">
              <label className="form-label">Assignee</label>
            </div>
            <div className="input-container">
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
            </div>
          </div>
          <div className="form-section">
            <div className="label-container">
              <label className="form-label">Mark Complete</label>
            </div>
            <div className="input-container">
              <input
                style={{
                  margin: "9px 0px 18px 40px",
                  width: "16px",
                  height: "16px",
                }}
                type="checkbox"
                name="completed"
                defaultChecked={false}
                ref={register}
              ></input>
            </div>

            <div className="label-container">
              <label className="form-label">Column</label>
            </div>
            <div className="input-container">
              <select
                id="tasklist-select"
                name="tasklistId"
                className="form-input"
                ref={register({
                  required: true,
                })}
              >
                {/* <option value={0}>Choose a project first</option> */}
                {projectTaskLists.length === 0 ? (
                  <option>
                    You need to make a column in your project first.
                  </option>
                ) : (
                  renderedTasklists
                )}
                {/* {renderedTasklists} */}
              </select>
              {/* <p className="error-message">{taskListError}</p> */}
              {errors.tasklistId?.type === "required" && (
                <p className="error-message">
                  Please choose a column. You may need to make a column in your
                  project first before adding a task.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="form-description-container">
          <textarea
            name="description"
            type="text"
            placeholder={"Task Description"}
            className="edit-task-description textarea"
            ref={register}
          ></textarea>
        </div>

        <div className="form-button-container">
          <button
            className="cancel-button"
            onClick={showSideTaskForm}
            color="primary"
          >
            Cancel
          </button>
          <button
            className={
              taskName && dueDate
                ? "submit-button enabled"
                : "submit-button disabled"
            }
            disabled={taskName && dueDate ? false : true}
            type="submit"
          >
            Create Task
          </button>
        </div>
      </form>
    </>
    //   </Modal>
    // </div>
  );
};

export default TaskForm;
