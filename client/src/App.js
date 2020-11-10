import React, { useContext, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider as UserProvider } from "./context/UserContext";
import Routes from "./components/Routes";
import LandingPage from "./components/LandingPage/LandingPage";
import { Context as UserContext } from "./context/UserContext";
import Home from "./components/Home";
import LandingRoutes from "./components/LandingPage/LandingRoutes";
const App = () => {
  // const [auth, setAuth] = useState(localStorage.getItem("token") || "");
  // const { signin } = useContext(UserContext);

  return (
    <UserProvider>
      {/* {state.auth ? <Routes /> : <LandingRoutes/> } */}
      {/* <Route exact path="/" component={LandingPage}></Route> */}
      <Routes />
      {/* {state.auth ? <Route path="/" component={Home} /> : <Routes />} */}
    </UserProvider>
  );
};

export default App;
