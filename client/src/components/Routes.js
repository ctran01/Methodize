import React, { useContext, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./Home";
import { Context as UserContext } from "../context/UserContext";
import LandingPage from "./LandingPage/LandingPage";
import LandingRoutes from "./LandingPage/LandingRoutes";
import AuthRoutes from "./AuthRoutes";

const Routes = () => {
  const { state, localSignin } = useContext(UserContext);
  const { auth, token, email, userid } = state;

  useEffect(() => {}, []);
  //If there is Auth(ternary statement) load separate auth component that includes Login, signup, landing.
  // OR have auth ternary statement render in each route
  return (
    <BrowserRouter>
      <Switch>{auth ? <AuthRoutes /> : <LandingRoutes />}</Switch>
    </BrowserRouter>
  );
};

export default Routes;
