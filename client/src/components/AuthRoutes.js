import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Pages/Home";
import Tasks from "./Pages/Tasks";
import "../css/Navbar.css";
import LeftNavBar from "./NavigationBar/LeftNavBar";
import TopNavBar from "./NavigationBar/TopNavBar";
const AuthRoutes = () => {
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <BrowserRouter>
      <div className="overlay">
        <LeftNavBar showSidebar={showSidebar} sidebar={sidebar} />
        <div className="overlay-right-container">
          {/* <TopNavBar showSidebar={showSidebar} sidebar={sidebar} /> */}
          <Switch>
            {/* <Route exact path="/register/onboard" component={Onboard} /> */}
            <Route exact path="/" component={Home} />
            <Route path="/tasks" component={Tasks} />
            <Route
              path="/*"
              render={() => {
                return <Redirect to="/" />;
              }}
            />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AuthRoutes;
