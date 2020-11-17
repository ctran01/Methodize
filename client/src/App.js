import React, { useContext, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Routes from "./components/Routes";
import LandingPage from "./components/LandingPage/LandingPage";
import AuthContext from "./context/AuthContext";
import { Provider as UserProvider } from "./context/UserContext";
import LandingRoutes from "./components/LandingPage/LandingRoutes";
const App = () => {
  const [auth, setAuth] = useState(localStorage.getItem("token") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [email, setEmail] = useState(localStorage.getItem("email") || null);
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const context = {
    auth,
    setAuth,
    userId,
    setUserId,
    email,
    setEmail,
    user,
    setUser,
    sidebar,
    setSidebar,
    showSidebar,
  };

  return (
    <AuthContext.Provider value={context}>
      <UserProvider>
        {/* {state.auth ? <Routes /> : <LandingRoutes/> } */}
        {/* <Route exact path="/" component={LandingPage}></Route> */}
        <Routes />
        {/* {state.auth ? <Route path="/" component={Home} /> : <Routes />} */}
      </UserProvider>
    </AuthContext.Provider>
  );
};

export default App;
