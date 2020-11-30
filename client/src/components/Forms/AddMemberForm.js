import React, { useEffect, useState, useContext } from "react";
import "../../css/Task.css";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import { useForm } from "react-hook-form";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";

const AddMemberForm = ({ projectId, clickClose, open }) => {
  const { register, handleSubmit, errors, clearErrors } = useForm();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  const onSubmit = async ({ name }) => {
    const userId = localStorage.getItem("userId");

    await apiServer.post(`/project/${projectId}/tasklist`, { name, userId });

    const res = await apiServer.get(`/project/${projectId}/tasklists`);
    clickClose();
  };

  const getAllUsers = async () => {
    const res = await apiServer.get("/users");
    setUsers(res.data);
    setLoading(false);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const renderedUsers = users.map((user, i) => {
    return (
      <option key={i} id={user.id} value={user.id}>
        {user.name} - {user.email}
      </option>
    );
  });
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
            <h2 className="form-header">Add a member to the team!</h2>
            <div className="form-top-container">
              <div className="form-top-left">
                <label className="form-label">
                  <select
                    id="project-select"
                    name="projectId"
                    className="form-input"
                    ref={register({ required: true })}
                  >
                    <option value={0}>{"<---Choose user--->"}</option>
                    {renderedUsers}
                  </select>
                  {errors.projectId?.type === "required" && (
                    <p className="error-message">Please choose a user to add</p>
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

export default AddMemberForm;
