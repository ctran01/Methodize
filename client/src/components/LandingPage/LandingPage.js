import React from "react";
import "../../css/LandingPage.css";
import logo from "../../assets/logo3.png";
import picture from "../../assets/Methodize.jpg";
import { BsCardChecklist } from "react-icons/bs";
import { AiOutlineTeam } from "react-icons/ai";
import { MdAssignment } from "react-icons/md";

const LandingPage = () => {
  return (
    <div>
      <div className="landing-container">
        <div className="landing-nav-container">
          <div className="landing-nav-logo">
            <a href="/">
              <img
                className="logo"
                style={{ width: "180px" }}
                src={logo}
                alt="logo"
              />
            </a>
          </div>
          <div className="landing-nav-sessions">
            <a href="/login">
              <button className="landing-nav--button">Login</button>
            </a>
            <a href="/register">
              <button className="landing-nav--button">Register</button>
            </a>
          </div>
        </div>
        <div className="landing-main">
          <div className="landing-message">
            <h2
              style={{
                textAlign: "center",
                fontSize: "3em",
                fontWeight: "200",
              }}
            >
              Keeping track of everything from as big as multiple teams to as
              small as individual tasks has never been easier
            </h2>
            <div className="landing-message-button--div">
              <a href="/register">
                <button className="landing-message--button">
                  Try for free!
                </button>
              </a>
            </div>
          </div>
          <div className="landing-main-picture">
            <img src={picture} alt="landing" className="landing-picture" />
          </div>
          <div className="landing-main-bottom">
            <div className="landing-main-bottom-icons-container">
              <div className="icon-container">
                <AiOutlineTeam
                  style={{ fontSize: "75px", color: "rgb(59, 182, 170)" }}
                />
                <p>
                  Establish Teams with other colleagues and work together to
                  accomplish tasks.
                </p>
              </div>
              <div className="icon-container">
                <MdAssignment
                  style={{ fontSize: "75px", color: "rgb(59, 182, 170)" }}
                />
                <p>
                  Create multiple projects within a team categorize tasks based
                  on different types of projects.
                </p>
              </div>
              <div className="icon-container">
                <BsCardChecklist
                  style={{ fontSize: "75px", color: "rgb(59, 182, 170)" }}
                />
                <p>
                  Keep track of tasks via tasklists in individual projects and
                  check them off when they are completed.
                </p>
              </div>
            </div>
            <div className="guest-login-button">
              <a href="/login">
                <button className="landing-message--button">
                  Guest Login!
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
