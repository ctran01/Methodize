import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopNavBar from "../NavigationBar/TopNavBar";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";
import "../../css/TeamPage.css";
import TeamMemberIcon from "../teams/TeamMemberIcon";
import ProjectTile from "../projects/ProjectTile";
import NewProjectTile from "../projects/NewProjectTile";
import NewTeamMemberIcon from "../teams/NewTeamMemberIcon";

const TeamPage = () => {
  const { teamId, teamName } = useParams();
  const [team, setTeam] = useState();
  const [teamProjects, setTeamProjects] = useState();
  const [teamUsers, setTeamUsers] = useState();
  const [teamDescription, setTeamDescription] = useState();
  const [loading, setLoading] = useState(true);

  const getTeam = async () => {
    try {
      const res = await apiServer.get(`/team/${teamId}`);
      setTeam(res.data);
      setTeamProjects(res.data.Projects);
      setTeamUsers(res.data.Users);
      setTeamDescription(res.data.description);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (e) => {
    setTeamDescription(e.target.value);
  };

  const updateDescription = async (e) => {
    const description = e.target.value;
    await apiServer.put(`/team/${teamId}/description`, { description });
    console.log(e.target.value);
  };

  useEffect(() => {
    getTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId, teamName, setTeam, setTeamProjects, setTeamUsers]);

  if (loading) {
    return <Loader />;
  }

  const membersList = teamUsers.map((user, i) => {
    return <TeamMemberIcon user={user} key={i} />;
  });

  const projectsList = teamProjects.map((project, i) => {
    return (
      <ProjectTile teamId={teamId} project={project} key={i} id={project.id} />
    );
  });
  return (
    <div>
      <TopNavBar name={teamName} setTeamProjects={setTeamProjects} />
      <div className="team-page-container">
        <div className="team-page-content-container">
          <div className="team-page-content-left">
            <div className="team-content-left-description-container">
              <div className="team-content-left-description-header">
                <div className="team-content-title">Description</div>
              </div>
              <form className="team-content-left-description-form">
                <textarea
                  className="edit-description"
                  placeholder="Click to add team description..."
                  value={teamDescription}
                  onChange={handleUpdate}
                  onBlur={updateDescription}
                ></textarea>
              </form>
            </div>
            <div className="team-content-left-members-container">
              <div className="team-content-left-members-header">
                <div className="team-content-title">Members</div>
              </div>
              <div className="team-content-left-members--list">
                {membersList}
                <NewTeamMemberIcon
                  setTeamUsers={setTeamUsers}
                  teamId={teamId}
                />
              </div>
            </div>
          </div>
          <div className="team-page-content-right">
            <div className="team-content-right-header">
              <div className="team-content-title">Projects</div>
            </div>
            <div className="team-content-right-projects--list">
              {projectsList}
              <NewProjectTile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
