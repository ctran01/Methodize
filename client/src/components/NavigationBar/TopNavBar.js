import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "../../css/Navbar.css";
import { CgProfile } from "react-icons/cg";
import { GrAddCircle } from "react-icons/gr";

const TopNavBar = ({ sidebar, showSidebar }) => {
  const { setAuth, setEmail, setUserId } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    setAuth(null);
    setEmail(null);
    setUserId(null);
  };

  return (
    <div className="top-nav-bar-container">
      <div className="top-nav-bar-left">
        <h2>Team/Project Name</h2>
      </div>
      <div className="top-nav-bar-middle"></div>
      <div className="top-nav-bar-right">
        <div>Search</div>
        <div>
          <GrAddCircle />
        </div>
        <div>
          <CgProfile />
        </div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default TopNavBar;
