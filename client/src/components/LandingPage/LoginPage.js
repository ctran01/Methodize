import React from "react";

import logo from "../../assets/logo.png";
import "../../css/LoginPage.css";
import LoginForm from "../Forms/LoginForm";
const LoginPage = () => {
  return (
    <div className="login-page-container">
      <div className="login-page-header">
        <img src={logo} alt="logo" style={{ width: "70px" }} />
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
