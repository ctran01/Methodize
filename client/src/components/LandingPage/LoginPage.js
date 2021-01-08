import React from "react";

import logo from "../../assets/logo.png";
import "../../css/LoginPage.css";
import LoginForm from "../Forms/LoginForm";
import { MdKeyboardBackspace } from "react-icons/md";
const LoginPage = () => {
  return (
    <div className="login-page-container">
      <div className="login-page-header">
        <a href="/">
          <img src={logo} alt="logo" style={{ width: "70px" }} />
        </a>
        <h1
          style={{
            fontWeight: "500",
            marginBottom: "20px",
            marginTop: "1px",
            fontSize: "24px",
          }}
        >
          Welcome back!{" "}
        </h1>
      </div>
      <div>
        <a href="/" style={{ textDecoration: "none" }}>
          <div style={{ marginRight: "225px", display: "flex" }}>
            <div style={{ display: "flex", marginTop: "3px" }}>
              <MdKeyboardBackspace />
            </div>
            <div>
              <p style={{ margin: "0", fontSize: "14px" }}>back to home page</p>
            </div>
          </div>
        </a>
      </div>
      <LoginForm />

      <div className="register-container">
        Not a user?{" "}
        <a style={{ textDecoration: "none", color: "blue" }} href="/register">
          Click here to sign up
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
