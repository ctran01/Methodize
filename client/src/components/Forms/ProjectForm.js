import React, { useContext } from "react";
import { Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import apiServer from "../../config/apiServer";
import { Context as TeamContext } from "../../context/store/TeamStore";
import { Context as ProjectContext } from "../../context/store/ProjectStore";
import "../../css/Forms.css";
const ProjectForm = ({ handleNewClose, clickClose, open, setTeamProjects }) => {
  const { register, handleSubmit, errors, clearErrors } = useForm();
  const [teamState, teamdispatch] = useContext(TeamContext);
  const [projectState, projectdispatch] = useContext(ProjectContext);
  const userId = localStorage.getItem("userId");

  const onSubmit = async ({ name, teamId }) => {
    await apiServer.post(`/team/${teamId}/project/`, {
      name,
      userId,
    });

    //REFER TO THIS WHEN CHECKING FOR RERENDERING
    const res = await apiServer.get(`/project/user/${userId}`);
    await projectdispatch({ type: "get_user_projects", payload: res.data });
    const projectResponse = await apiServer.get(`/team/${teamId}`);
    // NOTE: One way this could work is if we recreate form for just team page add project form button
    // Will not work with top nav bar form
    // setTeamProjects(projectResponse.data.Projects);
    await teamdispatch({
      type: `get_team_projects${teamId}`,
      payload: projectResponse.data,
    });
    if (setTeamProjects) {
      const teamResponse = await apiServer.get(`/team/${teamId}`);
      setTeamProjects(teamResponse.data.Projects);
    }
    // window.location.reload();

    clickClose();
  };

  const clearError = () => {
    var teamSelect = document.getElementById("team-select");
    clearErrors(teamSelect.name);
  };
  const renderedTeams = teamState.teams.map((team, i) => {
    return (
      <option key={i} id={team.id} value={team.id}>
        {team.name}
      </option>
    );
  });

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
                    onChange={clearError}
                    ref={register({ required: true })}
                  ></input>
                  {errors.name?.type === "required" && (
                    <p className="error-message">
                      Please fill out project name
                    </p>
                  )}
                </label>
              </div>
              <div className="form-top-middle">
                <label className="form-label" style={{ width: "200px" }}>
                  Team
                  <select
                    id="team-select"
                    name="teamId"
                    className="form-input"
                    ref={register({ required: true })}
                  >
                    {renderedTeams}
                  </select>
                  {errors.teamId?.type === "required" && (
                    <p className="error-message">Please choose a team</p>
                  )}
                </label>
              </div>
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
