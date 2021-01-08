import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import "../../css/LoginPage.css";
import apiServer from "../../config/apiServer";
import { MdKeyboardBackspace } from "react-icons/md";
const RegisterPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const { setAuth, setEmail, setUserId, setUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const res = await apiServer.post("/register", { name, email, password });
      localStorage.setItem("onboard", res.data.token);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("userId", res.data.id);
      window.location.href = "/register/onboard";
      setErrorMessage("");
      setUser(res.data);
      setAuth(res.data.token);
      setEmail(res.data.email);
      setUserId(res.data.id);
    } catch (err) {
      setLoading(false);
      console.log(err.status);
      setErrorMessage("Something went wrong with registering");
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-page-header">
        <a href="/">
          <img src={logo} alt="logo" style={{ width: "70px" }} />
        </a>
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
          First things first, let's set up your account...
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
      <form className="register-page--form" onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="name">Full Name</label>
          <input
            name="name"
            placeholder="John Doe"
            ref={register({ required: true })}
          ></input>
          {errors.name?.type === "required" && (
            <p style={{ color: "red", margin: "1px" }}>
              Please enter your full name
            </p>
          )}
        </div>
        <div>
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
        <button type="submit">{loading ? "Registering.." : "Register"}</button>
        {errorMessage ? (
          <p style={{ color: "red", margin: "1px" }}>{errorMessage}</p>
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
