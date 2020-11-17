import React, { useContext, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import AuthContext from "../context/AuthContext";
import LandingPage from "./LandingPage/LandingPage";
import LandingRoutes from "./LandingPage/LandingRoutes";
import AuthRoutes from "./AuthRoutes";

const Routes = () => {
  const { auth } = useContext(AuthContext);

  //If there is Auth(ternary statement) load separate auth component that includes Login, signup, landing.
  // OR have auth ternary statement render in each route
  return <>{auth ? <AuthRoutes /> : <LandingRoutes />}</>;
};

export default Routes;
