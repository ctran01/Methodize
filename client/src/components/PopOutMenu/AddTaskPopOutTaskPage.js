import React from "react";
import AddTaskForm from "../Forms/AddTaskForm";
import "../../css/PopOutForms.css";
import { RiCloseLine } from "react-icons/ri";
const AddTaskPopOutTaskPage = ({ showSideTaskForm, title }) => {
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
            <AddTaskForm showSideTaskForm={showSideTaskForm} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTaskPopOutTaskPage;
