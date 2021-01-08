import React, { useEffect, useState, useContext } from "react";
import "../../css/Task.css";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import { useForm } from "react-hook-form";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";
import { Context as TasklistContext } from "../../context/store/TasklistStore";
import { useParams } from "react-router-dom";

//form to add task from selected project
const AddTaskProjectForm = ({
  tasklistId,

  clickClose,
  open,
  setTasklistTasks,
  setTasklists,
  showSideTaskForm,
}) => {
  const { register, handleSubmit, errors } = useForm();
  const { teamId, projectId } = useParams();
  const [projectUsers, setProjectUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [tasklistState, tasklistdispatch] = useContext(TasklistContext);

  const { selectedTasklist } = tasklistState;
  const getProjectUsers = async (event) => {
    const res = await apiServer.get(`/team/${teamId}/users`);
    setProjectUsers(res.data[0].Users);
    setLoading(false);
  };

  useEffect(() => {
    getProjectUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Probably need dispatch here to update the task page when task is created.

  const onSubmit = async ({
    name,
    assigneeId,
    due_date,
    completed,
    description,
  }) => {
    console.log(assigneeId);
    console.log(projectId);
    console.log(due_date);
    console.log(completed);
    await apiServer.post(`/tasklist/${selectedTasklist}/task`, {
      name,
      projectId,
      assigneeId,
      due_date,
      completed,
      description,
    });

    // const res = await apiServer.get(`/tasklist/${tasklistId}/tasks`);

    // const res = await apiServer.get(`/project/${projectId}/tasklists`);
    // const taskResponse = await apiServer.get(`/project/${projectId}/tasks`);
    // setTasks(taskResponse.data);
    // setTasklistTasks(res.data);
    const resp = await apiServer.get(`/project/${projectId}/tasklists`);
    setTasklists(resp.data);
    showSideTaskForm();
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
      {/* <Modal open={open} onClose={clickClose}> */}
      {/* <div className="modal-container"> */}
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        {/* <h2 className="form-header">Add a Task</h2> */}
        <div className="form-top-container">
          <div className="form-section">
            <div className="input-section">
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
                ></input>
                {errors.name?.type === "required" && (
                  <p className="error-message">Please enter a task name</p>
                )}
              </div>
            </div>

            <div className="input-section">
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
                {errors.assigneeId?.type === "required" && (
                  <p className="error-message">Please choose an assignee</p>
                )}
              </div>
            </div>
          </div>
          <div className="form-section" style={{ marginTop: "42px" }}>
            <div className="input-section">
              <div className="label-container">
                <label className="form-label">Due date</label>
              </div>
              <div className="input-container">
                <input
                  className="form-input"
                  type="date"
                  name="due_date"
                  ref={register({ required: true })}
                ></input>
                {errors.due_date?.type === "required" && (
                  <p className="error-message">Please choose a due_date</p>
                )}
              </div>
            </div>

            <div className="input-section">
              <div className="label-container">
                <label
                  className="form-label"
                  style={{ padding: "10px 5px 10px 0px" }}
                >
                  Mark Complete
                </label>
              </div>
              <div className="input-container">
                <input
                  style={{
                    margin: "0px 0px 14px 40px",
                    width: "16px",
                    height: "16px",
                  }}
                  type="checkbox"
                  name="completed"
                  //here
                  defaultChecked={false}
                  ref={register}
                ></input>
              </div>
            </div>
          </div>
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

        <div className="form-button-container">
          <Button
            style={{ color: "#0093ff" }}
            onClick={showSideTaskForm}
            color="primary"
          >
            Cancel
          </Button>
          <Button style={{ color: "#0093ff" }} type="submit" color="primary">
            Add
          </Button>
        </div>
      </form>
      {/* </div> */}
      {/* </Modal> */}
    </div>
  );
};

export default AddTaskProjectForm;
