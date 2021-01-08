import React, { useContext } from "react";
import { Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import apiServer from "../../config/apiServer";
import { Context as TeamContext } from "../../context/store/TeamStore";
import "../../css/Forms.css";
const TeamForm = ({ handleNewClose, clickClose, open }) => {
  const { register, handleSubmit, errors } = useForm();
  const [teamState, teamdispatch] = useContext(TeamContext);
  const userId = localStorage.getItem("userId");

  const onSubmit = async ({ name, description }) => {
    await apiServer.post(`/team/user/${userId}`, {
      name,
      description,
    });

    const res = await apiServer.get(`/team/user/${userId}`);
    await teamdispatch({ type: "update_user_teams", payload: res.data });
    clickClose();
  };

  return (
    <div>
      <Modal open={open} onClose={clickClose}>
        <div className="modal-container">
          <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form-header">Create a Team</h2>
            <div className="form-top-container">
              <div className="form-top-left">
                <label className="form-label">
                  Team Name
                  <input
                    name="name"
                    type="text"
                    placeholder={"Team Name"}
                    className="form-input"
                    ref={register({ required: true })}
                  ></input>
                  {errors.name?.type === "required" && (
                    <p className="error-message">Please enter a team name</p>
                  )}
                </label>
              </div>
              <div className="form-top-middle"></div>
              {/* <div
                className="form-top-right"
                style={{ alignSelf: "normal" }}
              ></div> */}
            </div>
            <div>
              <textarea
                name="description"
                type="text"
                placeholder={"Team Description"}
                className="edit-task-description textarea"
                ref={register}
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
                Add
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default TeamForm;
