import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login";
import LandingPage from "./LandingPage";
import Register from "./Register";

const LandingRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" componen={Register} />
        <Route exact path="/" component={LandingPage} />
        <Route
          path="/*"
          render={() => {
            return <Redirect to="/" />;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default LandingRoutes;
