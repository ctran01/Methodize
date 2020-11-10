import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context as UserContext } from "../../context/UserContext";
import logo from "../../assets/logo.png";
import "../../css/LoginPage.css";

const RegisterPage = () => {
  const { signup, state } = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm();

  return (
    <div className="register-page-container">
      <div className="register-page-header">
        <img src={logo} alt="logo" style={{ width: "70px" }} />
        <h1
          style={{
            fontWeight: "500",
            marginBottom: "10px",
            marginTop: "1px",
            fontSize: "24px",
          }}
        >
          Welcome to Methodize!{" "}
        </h1>
        <h1
          style={{
            fontWeight: "500",
            marginBottom: "20px",
            marginTop: "1px",
            fontSize: "20px",
          }}
        >
          First Steps..
        </h1>
      </div>
      <form className="register-page--form" onSubmit={handleSubmit(signup)}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="email">Email Address</label>
          <input
            name="email"
            type="email"
            ref={register({ required: true })}
          ></input>
          {errors.email?.type === "required" && (
            <p style={{ color: "red", margin: "1px" }}>
              Please enter an email address
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            ref={register({ required: true })}
          ></input>
          {errors.password?.type === "required" && (
            <p style={{ color: "red", margin: "1px" }}>
              Please enter a password
            </p>
          )}
        </div>
        <button type="submit">Register</button>
        {state.errorMessage ? (
          <p style={{ color: "red", margin: "1px" }}>{state.errorMessage}</p>
        ) : null}
      </form>
      <div className="login-container">
        Already a user?{" "}
        <a style={{ textDecoration: "none", color: "blue" }} href="/login">
          Click here to login
        </a>
      </div>
    </div>
  );
};

export default RegisterPage;
