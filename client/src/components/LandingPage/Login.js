import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Context as UserContext } from "../../context/UserContext";
const Login = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, handleSubmit, errors } = useForm();

  // const handleLogin = (body) => {
  //   console.log(body);
  // };

  return (
    <form onSubmit={handleSubmit(login)}>
      <div>
        <label htmlFor="email">Email Address</label>
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          ref={register({ required: true })}
        ></input>
        {errors.email?.type === "required" && (
          <p>Please enter an email address</p>
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="password"
          ref={register({ required: true })}
        ></input>
        {errors.password?.type === "required" && <p>Please enter a password</p>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
