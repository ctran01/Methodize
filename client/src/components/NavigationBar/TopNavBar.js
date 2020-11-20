import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "../../css/Navbar.css";
import { CgProfile } from "react-icons/cg";
import { GrAddCircle } from "react-icons/gr";

const TopNavBar = ({ name }) => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="top-nav-bar-container">
      <div className="top-nav-bar-left">
        <h2>{name}</h2>
      </div>
      <div className="top-nav-bar-middle"></div>
      <div className="top-nav-bar-right">
        <div>Search</div>
        <div>
          <GrAddCircle className="top-nav-bar--icon" />
        </div>
        <div>
          <CgProfile className="top-nav-bar--icon" />
        </div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default TopNavBar;
