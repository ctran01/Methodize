import React, { useContext, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./HomePage/Home";
import UserContext from "../context/UserContext";
import LandingPage from "./LandingPage/LandingPage";
import LandingRoutes from "./LandingPage/LandingRoutes";
import AuthRoutes from "./AuthRoutes";

const Routes = () => {
  const { auth } = useContext(UserContext);

  //If there is Auth(ternary statement) load separate auth component that includes Login, signup, landing.
  // OR have auth ternary statement render in each route
  return <>{auth ? <AuthRoutes /> : <LandingRoutes />}</>;
};

export default Routes;
