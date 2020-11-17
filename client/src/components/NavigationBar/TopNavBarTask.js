import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { Context as UserContext } from "../../context/UserContext";
import "../../css/Navbar.css";
import { CgProfile } from "react-icons/cg";
import { GrAddCircle } from "react-icons/gr";
import apiServer from "../../config/apiServer";
const TopNavBarTask = () => {
  const { setAuth, setEmail, setUserId } = useContext(AuthContext);
  const { state } = useContext(UserContext);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    setAuth(null);
    setEmail(null);
    setUserId(null);
  };

  // useEffect(() => {
  //   getUserTasks();
  // }, []);
  console.log(state);
  return (
    <div className="top-nav-bar-container" style={{}}>
      <div
        className="top-nav-bar-left"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div style={{ fontSize: "20px" }}>{state.user.name}'s Tasks</div>
        <p style={{}}>[#] completed tasks</p>
      </div>
      <div className="top-nav-bar-middle"></div>
      <div className="top-nav-bar-right">
        <div>Search</div>
        <div>
          <GrAddCircle style={{ fontSize: "24px" }} />
        </div>
        <div>
          <CgProfile style={{ fontSize: "24px" }} />
        </div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default TopNavBarTask;
