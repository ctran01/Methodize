import React from "react";
import "../../css/LandingPage.css";
import picture from "../../assets/Product-screenshot.png";
import circles from "../../assets/Methodize_lp-circles-bg.png";
import { BsCardChecklist } from "react-icons/bs";
import { AiOutlineTeam } from "react-icons/ai";
import { MdAssignment } from "react-icons/md";
import { Button } from "@material-ui/core";
import Logo from "../../assets/Logo";

const LandingPage = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        right: "0px",
        bottom: "0px",
        backgroundImage: `linear-gradient(to top right, #2D3947, #151B26)`,
        backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        display: "flex",
        height: "100%",
        zIndex: "-2",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          right: "0px",
          bottom: "0px",
          backgroundImage: `url(${circles})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: "-1",
        }}
      ></div>
      <div className="landing-container">
        <div className="landing-nav-container">
          <div className="landing-nav-logo" style={{ paddingTop: "7px" }}>
            <a href="/">
              <Logo />
            </a>
          </div>
          <div className="landing-nav-sessions">
            <div style={{ marginRight: "20px" }}>
              <a href="/login">
                <button className="landing-nav-login--button">Login</button>
              </a>
            </div>

            <div>
              <a href="/register">
                <button className="landing-nav-register--button">
                  Register
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="landing-main">
          <div className="landing-message">
            <h2
              style={{
                fontSize: "3em",
                fontWeight: "200",
                color: "white",
                width: "57%",
              }}
            >
              The easiest way to manage team, projects, and tasks
            </h2>
            <h3 style={{ fontWeight: "200", color: "white", width: "46%" }}>
              Why use Methodize? Methodize gives you everything you need to stay
              in sync, hit deadlines, and reach your goals
            </h3>
            <div className="landing-message-button--div">
              <a href="/login">
                <button className="landing-message--button">Try Demo</button>
              </a>
            </div>
          </div>
          <div className="landing-main-picture">
            <img src={picture} alt="landing" className="landing-picture" />
          </div>
          {/* <div className="landing-main-bottom">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
