import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiServer from "../../config/apiServer";
import "../../css/Project.css";
import { AiOutlineProject } from "react-icons/ai";
import Loader from "../Loader";

const ProjectTile = ({ project, teamId, id }) => {
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState();
  const getTeam = async () => {
    const res = await apiServer.get(`/project/${project.id}/team`);
    setTeam(res.data);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const res = await apiServer.get(`/project/${project.id}/team`);
      setTeam(res.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Loader />;
  }
  const team_id = teamId || team.id;
  return (
    <Link
      className="project-tile--link"
      to={`/team/${team_id}/project/${project.id}/${project.name}`}
    >
      <div className={`project-tile-container`}>
        <div className="project-tile-box">
          <div className={`project-tile-icon project-tile-icon-${id}`}>
            <AiOutlineProject style={{ fontSize: "30px", color: "white" }} />
          </div>
        </div>
        <div className="project-tile-name">{project.name}</div>
      </div>
    </Link>
  );
};

export default ProjectTile;
