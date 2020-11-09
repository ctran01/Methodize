import React from "react";
import "../../css/LandingPage.css";
import logo from "../../assets/logo3.png";

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
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
