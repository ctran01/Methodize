import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import "../../css/Forms.css";
const ProjectForm = ({ handleNewClose, clickClose, open }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = ({ name }) => {
    console.log(name);
  };
  //try returning modal in here
  return (
    <div>
      <Modal open={open} onClose={clickClose}>
        <div className="modal-container">
          <form className="task-form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form-header">Add a Project</h2>
            <div className="form-top-container">
              <div className="form-top-left">
                <label className="form-label">
                  Project Name
                  <input
                    name="name"
                    type="text"
                    placeholder={"Project Name"}
                    className="form-input"
                    ref={register}
                  ></input>
                </label>
              </div>
              <div className="form-top-middle">
                <label className="form-label" style={{ width: "200px" }}>
                  Team
                  <select name="teamId" className="form-input">
                    <option value={"teamId"}>Team Name</option>
                  </select>
                </label>
              </div>
              {/* <div
                className="form-top-right"
                style={{ alignSelf: "normal" }}
              ></div> */}
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
                Add
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectForm;
