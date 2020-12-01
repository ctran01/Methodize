import React, { useContext } from "react";
import "../../css/Task.css";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import { useForm } from "react-hook-form";
import apiServer from "../../config/apiServer";
import { Context as TasklistContext } from "../../context/store/TasklistStore";
const TaskListForm = ({ projectId, clickClose, open, setTasklists }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async ({ name }) => {
    const userId = localStorage.getItem("userId");
    await apiServer.post(`/project/${projectId}/tasklist`, { name, userId });

    const res = await apiServer.get(`/project/${projectId}/tasklists`);
    setTasklists(res.data);
    // tasklistdispatch({ type: "update_project_tasklists", payload: res.data });
    clickClose();
  };
  return (
    <div>
      <Modal open={open} onClose={clickClose}>
        <div
          className="tasklist-modal-container"
          style={{ minWidth: "auto", width: "200px" }}
        >
          <form
            className="task-form"
            style={{}}
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="form-header">Add a Tasklist</h2>
            <div className="form-top-container">
              <div className="form-top-left">
                <label className="form-label">
                  Tasklist Name
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
              </div>
              <div className="form-top-middle"></div>
              <div className="form-top-right"></div>
            </div>

            <div style={{ display: "flex", marginLeft: "100px" }}>
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

export default TaskListForm;
