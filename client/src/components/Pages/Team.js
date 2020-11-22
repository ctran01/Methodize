import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopNavBar from "../NavigationBar/TopNavBar";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";
import "../../css/TeamPage.css";
import TeamMemberIcon from "../teams/TeamMemberIcon";
import ProjectTile from "../projects/ProjectTile";

const TeamPage = () => {
  const { teamId, teamName } = useParams();
  const [team, setTeam] = useState();
  const [loading, setLoading] = useState(true);
  const getTeam = async () => {
    try {
      const res = await apiServer.get(`/team/${teamId}`);
      setTeam(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTeam();
  });

  if (loading) {
    return <Loader />;
  }

  const membersList = () => {
    return <TeamMemberIcon />;
  };

  const projectsList = () => {
    return <ProjectTile />;
  };
  return (
    <div>
      <TopNavBar name={teamName} />
      <div className="team-page-container">
        <div className="team-page-content-container">
          <div className="team-page-content-left">
            <div className="team-content-left-description-container">
              <div className="team-content-left-description-header">
                <div className="team-content-title">Description</div>
              </div>
              <form className="team-content-left-description-form">
                <textarea
                  className="description"
                  placeholder="Click to add team description..."
                ></textarea>
              </form>
            </div>
            <div className="team-content-left-members-container">
              <div className="team-content-left-members-header">
                <div className="team-content-title">Members</div>
              </div>
              <div className="team-content-left-members--list"></div>
            </div>
          </div>
          <div className="team-page-content-right">
            <div className="team-content-right-header">
              <div className="team-content-title">Projects</div>
            </div>
            <div className="team-content-right-projects--list"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
