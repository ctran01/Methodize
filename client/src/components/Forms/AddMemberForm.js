import React, { useEffect, useState } from "react";
import "../../css/Task.css";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import { useForm } from "react-hook-form";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";

const AddMemberForm = ({ teamId, clickClose, open, setTeamUsers }) => {
  const { register, handleSubmit, errors } = useForm();
  const [users, setUsers] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const onSubmit = async ({ userId }) => {
    try {
      await apiServer.post(`/team/${teamId}/user/${userId}`);
      const res = await apiServer.get(`/team/${teamId}`);
      setTeamUsers(res.data.Users);

      clickClose();
    } catch (err) {
      setError("User already on team");
    }

    // const res = await apiServer.get(`/project/${projectId}/tasklists`);
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
        <div className="tasklist-modal-container" style={{ minWidth: "auto" }}>
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
                    id="user-select"
                    name="userId"
                    className="form-input"
                    onChange={() => setError("")}
                    ref={register({ required: true })}
                  >
                    <option value={0}>{"<---Choose user--->"}</option>
                    {renderedUsers}
                  </select>
                  <div className="error-message">{error}</div>
                  {errors.projectId?.type === "required" && (
                    <p className="error-message">Please choose a user to add</p>
                  )}
                </label>
              </div>
              <div className="form-top-middle"></div>
              <div className="form-top-right"></div>
            </div>

            <div style={{ display: "flex", marginLeft: "160px" }}>
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
