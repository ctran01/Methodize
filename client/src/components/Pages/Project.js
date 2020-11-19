import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiServer from "../../config/apiServer";
import TopNavBar from "../NavigationBar/TopNavBar";
const Project = () => {
  const { userId, projectName } = useParams();

  const [project, setProject] = useState();

  const getProject = async () => {
    try {
      const res = await apiServer.get(`/project/${projectName}/user/${userId}`);
      setProject(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProject();
  }, []);

  return (
    <div>
      <TopNavBar />
      <div>ProjectPage</div>
    </div>
  );
};

export default Project;
