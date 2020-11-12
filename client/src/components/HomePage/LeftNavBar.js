import React from "react";
import "../../css/Navbar.css";
import { RiMenuFoldLine, RiMenuFill } from "react-icons/ri";

const LeftNavBar = ({ showSidebar, sidebar }) => {
  return (
    <div className="left-nav-bar-container">
      <div className={sidebar ? "nav-menu active" : "nav-menu collapsed"}>
        <div className="left-nav-menu-container">
          <div
            className="left-nav-menu-top"
            style={{ display: "flex", flexDirection: "row", marginTop: "15px" }}
          >
            <div className="logo" style={{ color: "white" }}>
              Logo Here
            </div>
            <div className="collapse-menu-icon-container">
              <RiMenuFoldLine
                style={{ color: "white", fontSize: "24px", cursor: "pointer" }}
                onClick={showSidebar}
              />
            </div>
          </div>

          <div
            className="main-menu-items-container"
            style={{ marginTop: "10px" }}
          >
            <button>Home</button>
            <button>My Tasks</button>
          </div>
          <div className="favorites-container">
            <p style={{}}>Favorites</p>

            <li>Favorite 1</li>
            <li>Favorite 2</li>
          </div>
          <div className="teams-items-container">
            <div className="teams-items-header" style={{ display: "flex" }}>
              <p style={{}}>Teams</p>
              <p style={{ marginLeft: "140px", cursor: "pointer" }}>+</p>
            </div>
            <li>Team 1</li>
            <li>Team 2</li>
          </div>
        </div>
      </div>
      <div className="show-menu-icon">
        {sidebar ? null : (
          <div
            className="menu-icon"
            style={{
              paddingTop: "25px",
              marginLeft: "20px",
              boxShadow: "0 3px 0px 0px rgba(21, 27, 38, 0.08)",
              paddingBottom: "22px",
            }}
          >
            <RiMenuFill
              style={{
                fontSize: "24px",
                cursor: "pointer",
              }}
              onClick={showSidebar}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftNavBar;
