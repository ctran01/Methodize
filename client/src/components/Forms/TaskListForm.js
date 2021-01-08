import React, { useContext, useState } from "react";
import "../../css/Task.css";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import { useForm } from "react-hook-form";
import apiServer from "../../config/apiServer";
import { Context as TasklistContext } from "../../context/store/TasklistStore";
import { useParams } from "react-router-dom";

const TaskListForm = ({ setTasklists, showSideTasklistForm }) => {
  const { register, handleSubmit, errors } = useForm();
  const [tasklistName, setTasklistName] = useState();
  const { projectId } = useParams();
  const handleNameChange = (e) => {
    setTasklistName(e.target.value);
  };

  const onSubmit = async ({ name }) => {
    const userId = localStorage.getItem("userId");
    await apiServer.post(`/project/${projectId}/tasklist`, { name, userId });

    const res = await apiServer.get(`/project/${projectId}/tasklists`);
    setTasklists(res.data);
    // tasklistdispatch({ type: "update_project_tasklists", payload: res.data });
    showSideTasklistForm();
  };

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form
      className="form-container"
      style={{}}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* <h2 className="form-header">Add a Tasklist</h2> */}
      <div className="form-top-container">
        <div className="form-section">
          <div className="label-container">
            <label className="form-label">Column Name</label>
          </div>
          <div className="input-container">
            <input
              name="name"
              type="text"
              placeholder={"Column Name"}
              className="form-input"
              ref={register({ required: true })}
              onChange={handleNameChange}
              onKeyPress={handleUserKeyPress}
            ></input>
            {errors.name?.type === "required" && (
              <p className="error-message">Please enter a column name</p>
            )}
          </div>
        </div>
      </div>

      <div className="form-button-container">
        <button className="cancel-button" onClick={showSideTasklistForm}>
          Cancel
        </button>
        <button
          className={
            tasklistName ? "submit-button enabled" : "submit-button disabled"
          }
          disabled={tasklistName ? false : true}
          type="submit"
        >
          Create Column
        </button>
      </div>
    </form>
  );
};

export default TaskListForm;
