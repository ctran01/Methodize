import React, { useState } from "react";
import "../../css/Task.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const TaskForm = ({ handleNewClose, clickClose, open }) => {
  const handleSubmit = (event) => {};
  return (
    <div>
      <form>
        <Dialog
          open={open}
          onClose={clickClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add a Task</DialogTitle>

          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText> */}
            <div>
              <textarea
                name="name"
                type="text"
                placeholder={"Task Name"}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={clickClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" onClick={clickClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
};

export default TaskForm;
