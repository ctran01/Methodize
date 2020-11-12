import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import "../../css/Navbar.css";
import { RiMenuFoldLine, RiMenuFill } from "react-icons/ri";

const TopNavBar = ({ sidebar, showSidebar }) => {
  const { setAuth, setEmail, setUserId } = useContext(UserContext);

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
      <div className="top-nav-bar-middle">Search?</div>
      <div className="top-nav-bar-right">
        <div>Add button</div>
        <div>profile button</div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default TopNavBar;
