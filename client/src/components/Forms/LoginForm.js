import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Context as UserContext } from "../../context/UserContext";
import "../../css/LoginPage.css";
const LoginForm = () => {
  const { login } = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm();

  return (
    <form className="login-page--form" onSubmit={handleSubmit(login)}>
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
          <p style={{ color: "red", margin: "1px" }}>Please enter a password</p>
        )}
      </div>
      <button type="submit">Login</button>
      <button>Guest Login</button>
    </form>
  );
};

export default LoginForm;
