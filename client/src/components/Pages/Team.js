import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopNavBar from "../NavigationBar/TopNavBar";
import apiServer from "../../config/apiServer";
import Loader from "../Loader";

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

  return (
    <div>
      <TopNavBar name={teamName} />
      <div>Team Page</div>
    </div>
  );
};

export default TeamPage;
