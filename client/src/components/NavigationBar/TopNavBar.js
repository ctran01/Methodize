import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import "../../css/Navbar.css";
import { GrAddCircle } from "react-icons/gr";
import { Context as UserContext } from "../../context/store/UserStore";
import UserAvatar from "./UserAvatar";

const TopNavBar = ({ name }) => {
  const { logout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showNewMenu, setNewMenu] = useState(false);
  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleNewMenu = () => {};
  return (
    <div className="top-nav-bar-container">
      <div className="top-nav-bar-left">
        <h2>{name}</h2>
      </div>
      <div className="top-nav-bar-middle"></div>
      <div className="top-nav-bar-right">
        <div>Search</div>
        <div onClick={handleNewMenu}>
          <GrAddCircle className="top-nav-bar--icon" />
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

export default TopNavBar;
