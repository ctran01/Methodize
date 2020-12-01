import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthContext";
import "../../css/LoginPage.css";
import apiServer from "../../config/apiServer";
const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm();

  const [errorMessage, setErrorMessage] = useState("");
  const { setAuth, setEmail, setUserId, setUser } = useContext(AuthContext);
  const [formEmail, setFormEmail] = useState();
  const [password, setPassword] = useState();
  const onSubmit = async ({ email, password }) => {
    if (!email && !password) {
      email = "demo@email.com";
      password = "password";
    }
    setFormEmail(email);
    setPassword(password);

    try {
      const res = await apiServer.post("/login", { email, password });

      localStorage.setItem("email", res.data.email);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("token", res.data.token);
      setErrorMessage("");
      setAuth(res.data.token);
      setUserId(res.data.id);
      setEmail(res.data.email);
      setUser(res.data);
    } catch (err) {
      console.log(err.status);
      setErrorMessage("Something went wrong");
    }
  };

  // const demoUser = async () => {
  //   setErrorMessage("");

  //   const email = "demo@email.com";
  //   const password = "password";
  //   try {
  //     const res = await apiServer.post("/login", { email, password });

  //     localStorage.setItem("email", res.data.email);
  //     localStorage.setItem("userId", res.data.id);
  //     localStorage.setItem("token", res.data.token);
  //     setErrorMessage("");
  //     setAuth(res.data.token);
  //     setUserId(res.data.id);
  //     setEmail(res.data.email);
  //     setUser(res.data);
  //   } catch (err) {
  //     console.log(err.status);
  //     setErrorMessage("Something went wrong");
  //   }
  // };

  return (
    <form className="login-page--form" onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="email">Email Address</label>
        <input
          name="email"
          type="email"
          value={formEmail}
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
          value={password}
          ref={register({ required: true })}
        ></input>
        {errors.password?.type === "required" && (
          <p style={{ color: "red", margin: "1px" }}>Please enter a password</p>
        )}
      </div>
      <button type="submit">Login</button>
      {errorMessage ? (
        <p style={{ color: "red", margin: "1px" }}>{errorMessage}</p>
      ) : null}
      <button onClick={onSubmit}>Guest Login</button>
    </form>
  );
};

export default LoginForm;
