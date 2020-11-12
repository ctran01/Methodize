import React, { useContext, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Routes from "./components/Routes";
import LandingPage from "./components/LandingPage/LandingPage";
import UserContext from "./context/UserContext";
import LandingRoutes from "./components/LandingPage/LandingRoutes";
const App = () => {
  const [auth, setAuth] = useState(localStorage.getItem("token") || "");
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);
  const context = { auth, setAuth, userId, setUserId, email, setEmail };

  return (
    <UserContext.Provider value={context}>
      {/* {state.auth ? <Routes /> : <LandingRoutes/> } */}
      {/* <Route exact path="/" component={LandingPage}></Route> */}
      <Routes />
      {/* {state.auth ? <Route path="/" component={Home} /> : <Routes />} */}
    </UserContext.Provider>
  );
};

export default App;
