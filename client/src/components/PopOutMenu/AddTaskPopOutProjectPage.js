import React from "react";
import AddTaskProjectForm from "../Forms/AddTaskProjectForm";
import "../../css/PopOutForms.css";
import { RiCloseLine } from "react-icons/ri";
const AddTaskPopOutProjectPage = ({
  showSideTaskForm,
  title,
  setTasklists,
}) => {
  return (
    <>
      <div className={"popout-form"}>
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
                  onClick={showSideTaskForm}
                />
              </div>
            </div>
            <AddTaskProjectForm
              showSideTaskForm={showSideTaskForm}
              setTasklists={setTasklists}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTaskPopOutProjectPage;
