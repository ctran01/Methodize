import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider as UserProvider } from "./context/UserContext";
import Routes from "./components/Routes";
import Login from "./components/LandingPage/Login";
const App = () => {
  const [auth, setAuth] = useState(localStorage.getItem("token") || "");

  return (
    <UserProvider>
      <BrowserRouter>
        <Switch>
          <Routes />
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
