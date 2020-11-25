import React, { useState } from "react";
import "../../css/Task.css";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";

const TaskForm = ({ handleNewClose, clickClose, open }) => {
  const handleSubmit = (event) => {};

  return (
    <div>
      <Modal open={open} onClose={clickClose}>
        <div className="modal-container">
          <h2 className="form-header">Add a Task</h2>
          <form>
            <div className="form-top-container">
              <textarea
                name="name"
                type="text"
                placeholder={"Task Name"}
                className="name-textarea textarea"
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
                </div>
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
            </div>
            <div>
              <textarea
                name="description"
                type="text"
                placeholder={"Task Description"}
                className="edit-task-description textarea"
              ></textarea>
            </div>

            <div style={{ display: "flex", marginLeft: "400px" }}>
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
                Save
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default TaskForm;
