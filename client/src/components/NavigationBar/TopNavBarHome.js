import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import "../../css/Navbar.css";
import { CgProfile } from "react-icons/cg";
import { GrAddCircle } from "react-icons/gr";
const TopNavBarHome = () => {
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
    <div className="top-nav-bar-container" style={{ boxShadow: "none" }}>
      <div
        className="top-nav-bar-right"
        style={{ position: "fixed", right: "0" }}
      >
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

export default TopNavBarHome;
