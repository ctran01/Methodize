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
  const [showMenu, setShowMenu] = useState(false);
  const [newMenu, setNewMenu] = useState(false);
  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleNewMenu = () => {
    setNewMenu(!newMenu);
  };

  return (
    <div className="top-nav-bar-container" style={{}}>
      <div
        className="top-nav-bar-left"
        style={{ display: "flex", flexDirection: "column" }}
      ></div>
      <div className="top-nav-bar-middle"></div>
      <div className="top-nav-bar-right" style={{}}>
        <div>Search</div>
        <div onClick={handleNewMenu}>
          <GrAddCircle className="top-nav-bar--icon" />
          {newMenu ? (
            <div className="drop-down-new-menu">
              <button className="new-task--button" style={{ padding: "5px 0" }}>
                New Task
              </button>
              <button className="new-project--button">New Project</button>
            </div>
          ) : null}
        </div>
        <div onClick={handleMenu} className="top-nav-bar-user-icon">
          <UserAvatar />
          {showMenu ? (
            <div className="drop-down-menu">
              <button className="logout--button" onClick={logout}>
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TopNavBarHome;
