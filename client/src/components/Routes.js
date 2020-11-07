import React, { useContext } from "react";
import { Route } from "react-router-dom";
import Login from "./LandingPage/Login";
import { Context as UserContext } from "../context/UserContext";

const Routes = () => {
  const { state } = useContext(UserContext);
  const { auth, token, email, userid } = state;

  //If there is Auth(ternary statement) load separate auth component that includes Login, signup, landing.
  // OR have auth ternary statement render in each route
  return <Route path="/login" component={Login} />;
};

export default Routes;
