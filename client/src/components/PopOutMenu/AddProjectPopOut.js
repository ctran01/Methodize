import React from "react";

import "../../css/PopOutForms.css";
import { RiCloseLine } from "react-icons/ri";
import ProjectForm from "../Forms/ProjectForm";
const AddProjectPopOut = ({ showSideProjectForm, title, setTeamProjects }) => {
  return (
    <>
      <div
        className={"popout-form"}
        style={{ width: "30%", height: "96%", margin: "10px 10px 10px 10px" }}
      >
        <div
          style={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            minHeight: "1px",
            overflow: "hidden",
          }}
        >
          <div className="popout-form-container">
            <div className="popout-form-top">
              <div className="popout-form-header">
                <h2 className="form-header">{title}</h2>
              </div>
              <div className="popout-form-close-icon">
                <RiCloseLine
                  style={{
                    color: "black",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                  onClick={showSideProjectForm}
                />
              </div>
            </div>
            <ProjectForm
              showSideProjectForm={showSideProjectForm}
              setTeamProjects={setTeamProjects}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProjectPopOut;
