import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import "../../css/Navbar.css";
import { GrAddCircle } from "react-icons/gr";
import { Context as UserContext } from "../../context/store/UserStore";
import UserAvatar from "./UserAvatar";
import Loader from "../Loader";
const TopNavBarHome = () => {
  const { setAuth, setEmail, setUserId, logout } = useContext(AuthContext);
  // const [userState] = useContext(UserContext);
  // const [loading, setLoading] = useState(true);

  return (
    <div className="top-nav-bar-container" style={{}}>
      <div
        className="top-nav-bar-left"
        style={{ display: "flex", flexDirection: "column" }}
      ></div>
      <div className="top-nav-bar-middle"></div>
      <div className="top-nav-bar-right" style={{}}>
        <div>Search</div>
        <div>
          <GrAddCircle className="top-nav-bar--icon" />
        </div>
        <div className="top-nav-bar-user-icon">
          <UserAvatar />
        </div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default TopNavBarHome;
