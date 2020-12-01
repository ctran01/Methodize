import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import LandingRoutes from "./LandingPage/LandingRoutes";
import AuthRoutes from "./AuthRoutes";

const Routes = () => {
  const { auth } = useContext(AuthContext);

  //If there is Auth(ternary statement) load separate auth component that includes Login, signup, landing.
  // OR have auth ternary statement render in each route
  return <>{auth ? <AuthRoutes /> : <LandingRoutes />}</>;
};

export default Routes;
